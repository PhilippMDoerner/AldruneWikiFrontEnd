import { ActivatedRoute, Route, Router } from '@angular/router';

export function getComponentRoutes(router: Router, componentName : string): string[]{
    const routes: {path?: string, component?}[] = router.config;
    const componentRoutes = routes.filter(pathObject => pathObject.component.name === componentName);
    const componentRouteStrings = componentRoutes.map(pathObject => pathObject.path);
    return componentRouteStrings;
}

export function getVariableRouteByName(router: Router, routeName: string): Route{
    const routes: Route[] = router.config;
    const routesWithRouteName = routes.filter(pathObject => pathObject.data.name === routeName);

    if (routesWithRouteName.length > 1) throw `There is more than 1 route with the name ${routeName}. Please contact the Developer to ensure all routes have unique names.`;
    if (routesWithRouteName.length === 0) throw `There is no route with the name ${routeName}. Please contact the Developer to use either a different route name or create a route for this name.`;

    const targetRouteObject = routesWithRouteName[0];
    return targetRouteObject;
}

export function getVariableRoutePathByName(router: Router, routeName: string): string{
    const targetRouteObject: Route = getVariableRouteByName(router, routeName);
    return targetRouteObject.path;
}

export function getRoutePath(router: Router, routeName: string, params = {}): string{
    let variableRoutePath = getVariableRoutePathByName(router, routeName);

    if (hasPathVariables(variableRoutePath)){
        const variableNames: string[] = getPathVariableNames(variableRoutePath);
        for (let variableName of variableNames){
            if(!params.hasOwnProperty(variableName)) throw `Tried to create path for route ${routeName} but lacked parameter ${variableName}`;
            variableRoutePath = variableRoutePath.replace(`:${variableName}`, params[variableName]);
        }
    }

    return `/${variableRoutePath}`;
}

function hasPathVariables(routePath: string): boolean{
    return routePath.includes('/:');
}

function getPathVariableNames(routePath: string): string[]{
    const routeSegments: string[] = routePath.split("/");
    const pathVariables: string[] = routeSegments.filter((segment: string) => segment.startsWith(":"));
    const variableNameStartIndex = 1;
    return pathVariables.map(segment => segment.slice(variableNameStartIndex));
}

export function routeNameMatches(route: ActivatedRoute, routeName: string): boolean{
    const routeData = route.snapshot.data;
    return routeData.name === routeName;
}