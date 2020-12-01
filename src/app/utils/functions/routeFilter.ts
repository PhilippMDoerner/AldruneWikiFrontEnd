import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

export function getComponentRoutes(router: Router, componentName : string): string[]{
    const routes: {path?: string, component?}[] = router.config;
    const componentRoutes = routes.filter(pathObject => pathObject.component.name === componentName);
    const componentRouteStrings = componentRoutes.map(pathObject => pathObject.path);
    return componentRouteStrings;
}

export function getRouteByName(router: Router, routeName: string): Route{
    const routes: Route[] = router.config;
    const routesWithRouteName = routes.filter(pathObject => pathObject.data.name === routeName);

    if (routesWithRouteName.length > 1) throw `There is more than 1 route with the name ${routeName}. Please contact the Developer to ensure all routes have unique names.`;
    if (routesWithRouteName.length === 0) throw `There is no route with the name ${routeName}. Please contact the Developer to use either a different route name or create a route for this name.`;

    const targetRouteObject = routesWithRouteName[0];
    return targetRouteObject;
}

export function getRoutePathByName(router: Router, routeName: string): string{
    const targetRouteObject: Route = getRouteByName(router, routeName);
    return targetRouteObject.path;
}

export function routeNameMatches(route: ActivatedRoute, routeName: string): boolean{
    const routeData = route.snapshot.data;
    return routeData.name === routeName;
}