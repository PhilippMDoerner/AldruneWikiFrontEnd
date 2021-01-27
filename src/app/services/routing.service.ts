import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { ApiObject } from 'src/app/models/base-models';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router,
  ) { }

  public routeToApiObject(object: ApiObject): void{
    //The replaces here are required due to router.navigateByUrl mucking up if presented with such a url.
    const objectUrl: string = object.getAbsoluteRouterUrl()
      .replace("(", "%28")
      .replace(")", "%29")
      .replace("?", "\?");
    this.router.navigateByUrl(objectUrl);
  }

  public routeToPath(routeName: string, params = {}): void{
    const routePath: string = this.getRoutePath(routeName, params);
    this.router.navigateByUrl(routePath);
  }

  public getRoutePath(routeName: string, params = {}): string{
    let variableRoutePath = this.getVariableRoutePathByName(routeName);

    if (this.hasPathVariables(variableRoutePath)){
      const variableNames: string[] = this.getPathVariableNames(variableRoutePath);
      for (let variableName of variableNames){
        if(!params.hasOwnProperty(variableName)) throw `Tried to create path for route ${routeName} but lacked parameter ${variableName}`;
        if (params[variableName] === null) params[variableName] = Constants.NONE_STRING;
        variableRoutePath = variableRoutePath.replace(`:${variableName}`, params[variableName]);
      }
    }

    return `/${variableRoutePath}`;
  }

  public routeToErrorPage(error: number| any): void{
    if (typeof error !== "number" && !error.hasOwnProperty("status")) throw "Incorrect error input. The input does not contain an error status or an object with the error status. Can not route to error page without error status.";
    if (typeof error !== "number" && error.hasOwnProperty("status")) error = error.status;
  
    const errorStatus: string = `${error}`;
    if (this.hasRoutePath(errorStatus)){
        this.routeToPath(errorStatus);
        return;
    }
  
    this.routeToPath('error');
  }

  public routeNameMatches(route: ActivatedRoute, routeName: string): boolean{
    const routeData = route.snapshot.data;
    return routeData.name === routeName;
  }

  private getVariableRouteByName(routeName: string): Route{
    const routes: Route[] = this.router.config;
    const routesWithRouteName = routes.filter(pathObject => pathObject.data.name === routeName);

    if (routesWithRouteName.length > 1) throw `There is more than 1 route with the name ${routeName}. Please contact the Developer to ensure all routes have unique names.`;
    if (routesWithRouteName.length === 0) throw `There is no route with the name ${routeName}. Please contact the Developer to use either a different route name or create a route for this name.`;

    const targetRouteObject = routesWithRouteName[0];
    return targetRouteObject;
  }

  private getVariableRoutePathByName(routeName: string): string{
    const targetRouteObject: Route = this.getVariableRouteByName(routeName);
    return targetRouteObject.path;
  }

  private hasPathVariables(routePath: string): boolean{
    return routePath.includes('/:');
  }

  public hasRoutePath(routeName: string): boolean{
    const routes = this.router.config;
    const routesWithRouteName = routes.filter(pathObject => pathObject.data.name === routeName);
    return routesWithRouteName.length > 0;
  }

  private getPathVariableNames(routePath: string): string[]{
    const routeSegments: string[] = routePath.split("/");
    const pathVariables: string[] = routeSegments.filter((segment: string) => segment.startsWith(":"));
    const variableNameStartIndex = 1;
    return pathVariables.map(segment => segment.slice(variableNameStartIndex));
  }
}
