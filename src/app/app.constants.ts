//TODO: Outsource some of these settings into a "default" service and store these settings in the database
export class Constants{
    public static get apiPrefix(): string { return "wiki1";}
    public static get spaPrefix(): string { return "wiki2";}

    // API Urls
    // public static get wikiUrl(): string { return "https://www.aldrune.com";} //prod backend
    // public static get wikiApiUrl(): string { return `${this.wikiUrl}/${this.apiPrefix}/api`;} //prod backend
    public static get wikiUrl(): string { return "http://localhost:8000";} //dev backend
    public static get wikiApiUrl(): string { return `${this.wikiUrl}/api`;} //dev backend
    public static get wikiSPAUrl(): string{ return `${this.wikiUrl}/${this.spaPrefix}`;}

    public static get wikiStaticUrl(): string { return `${this.wikiUrl}/static`;}
    public static get wikiMediaUrl(): string { return `${this.wikiUrl}/media`;}
    public static get wikiTokenUrl(): string { return `${this.wikiApiUrl}/token`;}
    public static get wikiTokenRefreshUrl(): string {return `${this.wikiTokenUrl}/refresh`;}
    public static get wikiUrlFrontendPrefix(): string { return '/wiki2';};
    public static get wikiUrlFrontendPrefixNoSlash(): string { return 'wiki2';};

    public static get NONE_STRING(): string { return "None";} //This value must be identical to the NONE_STRING setting in the backend
    public static get isSmallScreen(): boolean { return window.screen.availWidth < 576; } //Determines for various JS functions whether something is a small screen or not
    public static get isTouchDevice(): boolean { 
      return ( 'ontouchstart' in window ) || 
             ( navigator.maxTouchPoints > 0 ) || 
             ( navigator.msMaxTouchPoints > 0 );
    };

    //strings representing states
    public static get createState(): string { return "create";}
    public static get deleteState(): string { return "delete";}
    public static get updateState(): string { return "update";}
    public static get outdatedUpdateState(): string {return "outdated"} //When an Update to an article is based on a version of an article that is outdated
    public static get displayState(): string {return "display";}

    public static get createSignal(): string { return "create";}
    public static get deleteSignal(): string { return "delete";}
    public static get updateSignal(): string { return "update";}
    public static get cancelSignal(): string { return "cancel";}

    public static get maximumTapDistance(): number { return 20; }
    //Minimum Amount of Movement necessary for a gesture to count as swipe. Measured in pixels.
    public static get minimumSwipeDistance(): number { return 100; }
    //Maximum Amount of time that can pass for a gesture to count as swipe. Measured in ms.
    public static get maximumSwipeTime(): number { return 300; }

    //Mapping of article types to colors
    public static get articleTypeSidebarColorMapping(): object { return { 
        'item' : 'yellow',
        'character': 'blue',
        'creature': 'red',
        'location': 'brown',
        'organization' : 'purple',
        'diaryentry' : 'darkgreen',
        'quest' : 'white',
        'encounter' : 'lightgreen',
        'recording': 'green', //Used in the sidebar-legend in recent updated/search
        'sessionaudio': 'green', //Used in entries of recent updated/search
        'map': 'beige',
        'rules': 'orange',
        'spell': 'violet',
    }}

    public static get articleTypeMetaData(): object[] { 
      return [
        {
          title: "Home",
          iconClass: "fa fa-home",
          route: "home2",
          color: null,
          article_types: null,
          showInSidebar: true,
        },
        {
          title: "Creatures", 
          iconClass: "fas fa-dragon", 
          route: "creature-overview",
          color: "red",
          article_types: ["creature"],
          showInSidebar: true,
        },
        {
          title: "Characters", 
          iconClass: "fas fa-male", 
          route: "character-overview",
          color: "blue",
          article_types: ["character"],
          showInSidebar: true,
        },
        {
          title: "DiaryEntries", 
          iconClass: "fas fa-book-open", 
          route: "diaryentry-overview",
          color: "darkgreen",
          article_types: ["diaryentry"],
          showInSidebar: true,
        },
        {
          title: "Encounters",
          iconClass: "fa fa-comments",
          route: null,
          color: "lightgreen",
          article_types: ["encounter"],
          showInSidebar: false,
        },
        {
          title: "Items", 
          iconClass: "fa fa-magic", 
          route: "item-overview",
          color: "yellow",
          article_types: ["item"],
          showInSidebar: true,
        },
        {
          title: "Locations", 
          iconClass: "fas fa-compass", 
          route: "location-overview",
          color: "brown",
          article_types: ["location"],
          showInSidebar: true,
        },
        {
          title: "Organizations", 
          iconClass: "fas fa-sitemap", 
          route: "organization-overview",
          color: "purple",
          article_types: ["organization"],
          showInSidebar: true,
        },
        {
          title: "Maps", 
          iconClass: "fa fa-map", 
          route: 'default-map',
          color: "beige",
          article_types: ["map"],
          showInSidebar: true,
        },
        {
          title: "Quests", 
          iconClass: "fas fa-question-circle", 
          route: "quest-overview",
          color: "white",
          article_types: ["quest"],
          showInSidebar: true,
        },
        {
          title: "Spells", 
          iconClass: "fas fa-hand-sparkles", 
          route: "spells",
          color: "violet",
          article_types: ["spell", "spells"],
          showInSidebar: true,
        },
        {
          title: "Recordings", 
          iconClass: "fa fa-file-audio-o", 
          route: "sessionaudio-overview",
          color: "green",
          article_types: ["sessionaudio", "recording"],
          showInSidebar: true,
        },
        {
          title: "Rules", 
          iconClass: "fa fa-book", 
          route: "rules",
          color: "orange",
          article_types: ["rule", "rules"],
          showInSidebar: true,
        },
      ]
    } 

    // JWT Token Constants - Also used by PermissionGuardService/AdminGuardService
    public static get accessTokenType(): string { return "access";}
    public static get refreshTokenType(): string { return "refresh";}
    public static get anonymousUserName(): string { return "AnonymousUser";}
    public static get apiViewPermission(): string { return "wikientries.view_apipermissions";}
    public static get apiCreatePermission(): string { return "wikientries.add_apipermissions";}
    public static get apiDeletePermission(): string { return "wikientries.delete_apipermissions";}
    public static get apiUpdatePermission(): string { return "wikientries.change_apipermissions";}
    public static get adminPermission(): string { return "Admin";} //The actual value isn't all that relevant, the variable itself is recognized
    public static get superuserPermission(): string { return "SuperUser";} //The actual value isn't all that relevant, the variable itself is recognized

    // Keys for LocalStorage
    public static get accessTokenKey(): string { return "access_token";}
    public static get refreshTokenKey(): string { return "refresh_token";}

    // Static Image URLs
    public static get audioImageUrl(): string { return `${this.wikiStaticUrl}/fileserver/images/audio_pic.png`; }
    public static get timeoutImageUrl(): string { return `${this.wikiStaticUrl}/wiki/images/504.jpeg`; }
    public static get badInputImageUrl(): string { return `${this.wikiStaticUrl}/wiki/images/400.png`; }
    public static get pageNotFoundImageUrl(): string { return `${this.wikiStaticUrl}/wiki/images/404.png`; }
    public static get serverErrorImageUrl(): string { return `${this.wikiStaticUrl}/wiki/images/beholder.jpeg`; }

    //Login Custom Message to URL Mapping
    public static get loginMessageForState(): object { return {
        'token-expired': 'Your Session expired, please log in again',
        'token-null': 'You do not have a valid token, please log in',
        'invalid-login': 'No active account found with the given credentials',
        'logged-out': 'Log out successful. Log in again?',
        'no-token': 'You are not logged in. Please enter your credentials',
    }}

    //Number of pixels distance to the bottom needed to trigger loading the next set of entries on paginated pages
    //This is for endless scrollers on the start page and search results
    public static get maxDistanceToPageBottomForPaginationLoad(): number { return 400};

    //Default Image for Image Gallery
    public static get defaultImageUrl(): string { return `${this.wikiMediaUrl}/resources/dndicon.png`;}

    //Default Map to display
    public static get defaultMapName(): string {return `Aldrune`};

    public static get defaultCampaign(): string {return `Aldrune`};

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
            base_url: '/tinymce',
            suffix: '.min'
        }
    }

    //Spell Options
    public static get castingTimeOptions(): {label: String, value: String | Number}[] { return [
        {label: '1 Action',       value: '1 Action'},
        {label: '1 Bonus Action', value: '1 Bonus Action'},
        {label: '1 Reaction',     value: '1 Reaction'},
        {label: '1 Minute',       value: '1 Minute'},
        {label: '10 Minutes',     value: '10 Minutes'},
        {label: '1 Hour',         value: '1 Hour'},
        {label: '8 Hours',        value: '8 Hours'},
        {label: '12 Hours',       value: '12 Hours'},
        {label: '24 Hours',       value: '24 Hours'}
      ]
    }
    
    public static get savingThrowOptions(): {label: String, value: String | Number}[] { return [
        { value: 'ATK', label: 'Attack'},
        { value: "STR", label: "Strength"},
        { value: "CON", label: "Constitution"},
        { value: "DEX", label: "Dexterity"},
        { value: "INT", label: "Intelligence"},
        { value: "WIS", label: "Wisdom"},
        { value: "CHA", label: "Charisma"}
      ]
    }
    
    public static get spellLevelOptions(): {label: String, value: Number}[] { return [
        { value: 0, label: 'Cantrip'},
        { value: 1, label: '1'},
        { value: 2, label: '2'},
        { value: 3, label: '3'},
        { value: 4, label: '4'},
        { value: 5, label: '5'},
        { value: 6, label: '6'},
        { value: 7, label: '7'},
        { value: 8, label: '8'},
        { value: 9, label: '9'}
      ]
    }

    public static get durationOptions(): {label: String, value: String | Number}[] { return [
        { value: 'Instantaneous',   label: 'Instantaneous'},
        { value: '1 Round',         label: '1 Round'},
        { value: '6 Rounds',        label: '6 Rounds'},
        { value: '1 Minute',        label: '1 Minute'},
        { value: '10 Minutes',      label: '10 Minutes'},
        { value: '1 Hour',          label: '1 Hour'},
        { value: '2 Hours',         label: '2 Hours'},
        { value: '8 Hours',         label: '8 Hours'},
        { value: '24 Hours',        label: '24 Hours'},
        { value: '1 Day',           label: '1 Day'},
        { value: '7 Day',           label: '7 Days'},
        { value: '10 Day',          label: '10 Days'},
        { value: '30 Day',          label: '30 Days'},
        { value: 'Special',         label: 'Special'},
        { value: 'Until Dispelled', label: 'Until Dispelled'}
      ]
    }
    
    public static get rangeOptions(): {label: String, value: String | Number}[] { return [
        { value: 'Self',     label: 'Self'},
        { value: '5 Feet',   label: '5 Feet'},
        { value: '10 Feet',  label: '10 Feet'},
        { value: '15 Feet',  label: '15 Feet'},
        { value: '30 Feet',  label: '30 Feet'},
        { value: '60 Feet',  label: '60 Feet'},
        { value: '90 Feet',  label: '90 Feet'},
        { value: '100 Feet', label: '100 Feet'},
        { value: '120 Feet', label: '120 Feet'},
        { value: '150 Feet', label: '150 Feet'},
        { value: '1 Mile',   label: '1 Mile'},
        { value: '3 Miles',  label: '3 Miles'},
        { value: '10 Miles', label: '10 Miles'}
      ]
    }
    
    public static get componentOptions(): {value: String, label: String}[] { return [
        { value: 'V',   label: 'V'},
        { value: 'S',   label: 'S'},
        { value: 'M',   label: 'M'},
        { value: 'VS',  label: 'VS'},
        { value: 'VM',  label: 'VM'},
        { value: 'SM',  label: 'SM'},
        { value: 'VSM', label: 'VSM'},
        { value: 'VSM*',label: 'VSM*'}
      ]
    }
    
    public static get schoolOptions(): {value: String, label: String}[] { return [
        { value: 'Abjuration',    label: 'Abjuration'},
        { value: 'Conjuration',   label: 'Conjuration'},
        { value: 'Divination',    label: 'Divination'},
        { value: 'Enchantment',   label: 'Enchantment'},
        { value: 'Evocation',     label: 'Evocation'},
        { value: 'Illusion',      label: 'Illusion'},
        { value: 'Necromancy',    label: 'Necromancy'},
        { value: 'Transmutation', label: 'Transmutation'}
      ]
    }
}


export enum OverviewType{
  Character,
  Creature,
  Diaryentry,
  Encounter,
  Item,
  Location,
  Map,
  MarkerType,
  Organization,
  Quest,
  Quote,
  Rule,
  Session,
  Sessionaudio,
  Spell,
  User
}