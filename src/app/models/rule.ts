import { Constants } from "../app.constants";
import { ApiObject } from "./base-models";

export interface Rule extends ApiObject{
    pk?: number,
    name: string,
    creation_datetime?: string,
    update_datetime?: string,
    description: string
}

export class RuleObject implements Rule{
    pk?: number;
    name: string;
    creation_datetime?: string;
    update_datetime?: string;
    description: string;

    constructor(object?: Rule){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/rules/${this.name}`;
    }
}