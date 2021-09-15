import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { ApiObject } from 'src/app/models/base-models';
import { WarningsService } from './warnings.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router,
    private warning: WarningsService,
  ) {
    this.router .routeReuseStrategy.shouldReuseRoute = () => false;
   }

  public routeToApiObject(object: ApiObject): void{
    const objectUrl: string = object.getAbsoluteRouterUrl();
    const cleanedObjectUrl: string = this.replaceSpecialUnicodeCharacters(objectUrl);

    this.router.navigateByUrl(cleanedObjectUrl);
  }


  public routeToPath(routeName: string, params = {}): void{
    const routePath: string = this.getRoutePath(routeName, params)
    const cleanedObjectUrl: string = this.replaceSpecialUnicodeCharacters(routePath);
    this.router.navigateByUrl(cleanedObjectUrl);
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
    if (typeof error !== "number" && !error.hasOwnProperty("status")){
      this.warning.showWarning(error);
      throw "Incorrect error input. The input does not contain an error status or an object with the error status. Can not route to error page without error status.";
    }
    
    if (typeof error !== "number" && error.hasOwnProperty("status")) error = error.status;
  
    const errorStatusParam: string = `${error}`;
    this.routeToPath("error", {errorStatus: errorStatusParam});
  }


  public routeNameMatches(route: ActivatedRoute, routeName: string): boolean{
    const routeData = route.snapshot.data;
    return routeData.name === routeName;
  }


  /**
   * Replaces special characters with their % Equivalent, as otherwise they cause problems in router.navigatebyUrl
   * @param {string} routePath - A route, such as /home
   * @returns {string} The same routePath as was given, but with special characters replaced
   */
  private replaceSpecialUnicodeCharacters(routePath: string){
    return routePath
      .replace("(", "%28")
      .replace(")", "%29")
      .replace("?", "\?")
      .replace("†", "%E2%80%A0");
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
