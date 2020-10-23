export class Constants{
    public static get wikiUrl(): string { return "http://localhost:8000";}
    public static get wikiApiUrl(): string { return `${this.wikiUrl}/api`;}
    public static get wikiStaticUrl(): string { return `${this.wikiUrl}/static`;}
    //Used so far mostly in Image Gallery
    public static get createState(): string { return "create";}
    public static get deleteState(): string { return "delete";}
    public static get updateState(): string { return "update";}
    public static get displayState(): string {return "display";}

    public static get createSignal(): string { return "create";}
    public static get deleteSignal(): string { return "delete";}
    public static get updateSignal(): string { return "update";}
    public static get cancelSignal(): string { return "cancel";}
}