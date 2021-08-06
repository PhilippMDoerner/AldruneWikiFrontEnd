import { ActivatedRoute, Route, Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { ApiObject } from 'src/app/models/base-models';
import { routes } from 'src/app/app-routing.module';

export function getComponentRoutes(componentName : string): string[]{
    const componentRoutes = routes.filter(pathObject => pathObject.component.name === componentName);
    const componentRouteStrings = componentRoutes.map(pathObject => pathObject.path);
    return componentRouteStrings;
}

export function getVariableRouteByName(routeName: string): Route{
    const routesWithRouteName = routes.filter(pathObject => pathObject.data.name === routeName);

    if (routesWithRouteName.length > 1) throw `There is more than 1 route with the name ${routeName}. Please contact the Developer to ensure all routes have unique names.`;
    if (routesWithRouteName.length === 0) throw `There is no route with the name ${routeName}. Please contact the Developer to use either a different route name or create a route for this name.`;

    const targetRouteObject = routesWithRouteName[0];
    return targetRouteObject;
}

export function getVariableRoutePathByName(routeName: string): string{
    const targetRouteObject: Route = getVariableRouteByName(routeName);
    return targetRouteObject.path;
}

export function getRoutePath(routeName: string, params = {}): string{
    let variableRoutePath = getVariableRoutePathByName(routeName);

    if (hasPathVariables(variableRoutePath)){
        const variableNames: string[] = getPathVariableNames(variableRoutePath);
        for (let variableName of variableNames){
            if(!params.hasOwnProperty(variableName)) throw `Tried to create path for route ${routeName} but lacked parameter ${variableName}`;
            if (params[variableName] === null) params[variableName] = Constants.NONE_STRING;
            variableRoutePath = variableRoutePath.replace(`:${variableName}`, params[variableName]);
        }
    }

    return `/${variableRoutePath}`;
}

function hasPathVariables(routePath: string): boolean{
    return routePath.includes('/:');
}

export function hasRoutePath(routeName: string): boolean{
    const routesWithRouteName = routes.filter(pathObject => pathObject.data.name === routeName);
    return routesWithRouteName.length > 0;
}

function getPathVariableNames(routePath: string): string[]{
    const routeSegments: string[] = routePath.split("/");
    const pathVariables: string[] = routeSegments.filter((segment: string) => segment.startsWith(":"));
    const variableNameStartIndex = 1;
    return pathVariables.map(segment => segment.slice(variableNameStartIndex));
}
