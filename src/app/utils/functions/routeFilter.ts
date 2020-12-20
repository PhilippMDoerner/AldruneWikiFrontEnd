import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiObject } from 'src/app/models/base-models';

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

export function hasRoutePath(router: Router, routeName: string): boolean{
    const routes = router.config;
    const routesWithRouteName = routes.filter(pathObject => pathObject.data.name === routeName);
    return routesWithRouteName.length > 0;
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

export function routeToPath(router: Router, routeName: string, params = {}): void{
    const routePath: string = getRoutePath(router, routeName, params);
    router.navigateByUrl(routePath);
}

export function routeToApiObject(router: Router, object: ApiObject): void{
    const objectUrl: string = object.getAbsoluteRouterUrl();
    router.navigateByUrl(objectUrl);
}

export function routeToErrorPage(router: Router, error: number| any): void{
    if (typeof error !== "number" && !error.hasOwnProperty("status")) throw "Incorrect error input. The input does not contain an error status or an object with the error status. Can not route to error page without error status.";
    if (typeof error !== "number" && error.hasOwnProperty("status")) error = error.status;

    console.log(`Routed via routeToErrorPage with status`);
    console.log(status);
    if (hasRoutePath(router, `${status}`)){
        console.log("Found fitting error path, routing to " + getRoutePath(router, `${status}`));
        routeToPath(router, `${status}`);
        return;
    }
    console.log("No fitting error path, routing to plain error")
    routeToPath(router, 'error');
}