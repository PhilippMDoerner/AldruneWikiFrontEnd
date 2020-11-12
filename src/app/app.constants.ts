export class Constants{
    public static get wikiUrl(): string { return "http://localhost:8000";}
    public static get wikiApiUrl(): string { return `${this.wikiUrl}/api`;}
    public static get wikiStaticUrl(): string { return `${this.wikiUrl}/static`;}

    public static get NONE_STRING(): string { return "None";} //This value must be identical to the NONE_STRING setting in the backend
    //Used so far mostly in Image Gallery
    public static get createState(): string { return "create";}
    public static get deleteState(): string { return "delete";}
    public static get updateState(): string { return "update";}
    public static get displayState(): string {return "display";}

    public static get createSignal(): string { return "create";}
    public static get deleteSignal(): string { return "delete";}
    public static get updateSignal(): string { return "update";}
    public static get cancelSignal(): string { return "cancel";}

    //Mapping of article types to colors
    public static get articleTypeSidebarColorMapping(): object { return { 
        'item' : 'yellow',
        'character': 'darkpink',
        'creature': 'brown',
        'location': 'blue',
        'organization' : 'black',
        'diaryentry' : 'gray',
        'quest' : 'white',
        'encounter' : 'lightpink'
    }}
}