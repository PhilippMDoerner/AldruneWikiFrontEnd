export class Constants{
    // API Urls
    //public static get wikiUrl(): string { return "https://www.aldrune.com";} //prod
    public static get wikiUrl(): string { return "http://localhost:8000";} //dev
    public static get wikiApiUrl(): string { return `${this.wikiUrl}/api`;}
    public static get wikiStaticUrl(): string { return `${this.wikiUrl}/static`;}
    public static get wikiMediaUrl(): string { return `${this.wikiUrl}/media`;}
    public static get wikiTokenUrl(): string { return `${this.wikiApiUrl}/token`;}
    public static get wikiTokenRefreshUrl(): string {return `${this.wikiTokenUrl}/refresh`;}
    public static get wikiTinyMCEUrl(): string { return `${this.wikiStaticUrl}/frontend/tinymce`;}
    public static get wikiUrlFrontendPrefix(): string { return '/wiki';};
    public static get wikiUrlFrontendPrefixNoSlash(): string { return 'wiki';};

    public static get NONE_STRING(): string { return "None";} //This value must be identical to the NONE_STRING setting in the backend
    
    //strings representing states
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

    // JWT Token Constants
    public static get accessTokenType(): string { return "access";}
    public static get refreshTokenType(): string { return "refresh";}
    public static get anonymousUserName(): string { return "AnonymousUser";}

    // Keys for LocalStorage
    public static get accessTokenKey(): string { return "access_token";}
    public static get refreshTokenKey(): string { return "refresh_token";}

    //Login Custom Message to URL Mapping
    public static get loginMessageForState(): object { return {
        'token-expired': 'Your Session expired, please log in again',
        'token-null': 'You do not have a valid token, please log in',
        'invalid-login': 'No active account found with the given credentials',
        'logged-out': 'Log out successful. Log in again?',
        'no-token': 'You are not logged in. Please enter your credentials',
    }}

    //TinyMCE Settings
    public static get tinyMCESettings(): object{ return {
            plugins: [
                'advlist autolink lists link image charmap anchor',
                'searchreplace visualblocks fullscreen media',
                'table paste help wordcount'
            ],
            toolbar: [
                'undo redo | formatselect | bold italic underline strikethrough subscript superscript link unlink blockquote | backcolor forecolor hilitecolor fontsizeselect |',
                'alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | table help'
            ],
            skin: 'oxide-dark',
            content_css: 'dark',
            browser_spellcheck: true,
            menubar: false,
            height: 350,
            convert_urls: false,
            relative_urls: false,
            branding: false,
            base_url: this.wikiTinyMCEUrl,
            suffix: '.min'
        }
    }
}