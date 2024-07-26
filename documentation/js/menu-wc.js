'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">bee api&#x27;c project documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AddressModule.html" data-type="entity-link" >AddressModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AddressModule-9cf047e9e518944d0ce5fe782b3fb1284ecacb67547d4f7b0e33827d8d8ba226c7511817f0f7a990ef5388da5f51239387535a075429c56cfdd5ac7db6b87e57"' : 'data-bs-target="#xs-controllers-links-module-AddressModule-9cf047e9e518944d0ce5fe782b3fb1284ecacb67547d4f7b0e33827d8d8ba226c7511817f0f7a990ef5388da5f51239387535a075429c56cfdd5ac7db6b87e57"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AddressModule-9cf047e9e518944d0ce5fe782b3fb1284ecacb67547d4f7b0e33827d8d8ba226c7511817f0f7a990ef5388da5f51239387535a075429c56cfdd5ac7db6b87e57"' :
                                            'id="xs-controllers-links-module-AddressModule-9cf047e9e518944d0ce5fe782b3fb1284ecacb67547d4f7b0e33827d8d8ba226c7511817f0f7a990ef5388da5f51239387535a075429c56cfdd5ac7db6b87e57"' }>
                                            <li class="link">
                                                <a href="controllers/AddressController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AddressModule-9cf047e9e518944d0ce5fe782b3fb1284ecacb67547d4f7b0e33827d8d8ba226c7511817f0f7a990ef5388da5f51239387535a075429c56cfdd5ac7db6b87e57"' : 'data-bs-target="#xs-injectables-links-module-AddressModule-9cf047e9e518944d0ce5fe782b3fb1284ecacb67547d4f7b0e33827d8d8ba226c7511817f0f7a990ef5388da5f51239387535a075429c56cfdd5ac7db6b87e57"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AddressModule-9cf047e9e518944d0ce5fe782b3fb1284ecacb67547d4f7b0e33827d8d8ba226c7511817f0f7a990ef5388da5f51239387535a075429c56cfdd5ac7db6b87e57"' :
                                        'id="xs-injectables-links-module-AddressModule-9cf047e9e518944d0ce5fe782b3fb1284ecacb67547d4f7b0e33827d8d8ba226c7511817f0f7a990ef5388da5f51239387535a075429c56cfdd5ac7db6b87e57"' }>
                                        <li class="link">
                                            <a href="injectables/AddressRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AddressService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-ce0de4b097b40f7bf7fc0f814a388795bb2b9326f381d82294e497055d4e52b0404205520c81166a0444229e803e4fab362460fd264e24cf8b198d386f060b99"' : 'data-bs-target="#xs-controllers-links-module-AppModule-ce0de4b097b40f7bf7fc0f814a388795bb2b9326f381d82294e497055d4e52b0404205520c81166a0444229e803e4fab362460fd264e24cf8b198d386f060b99"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-ce0de4b097b40f7bf7fc0f814a388795bb2b9326f381d82294e497055d4e52b0404205520c81166a0444229e803e4fab362460fd264e24cf8b198d386f060b99"' :
                                            'id="xs-controllers-links-module-AppModule-ce0de4b097b40f7bf7fc0f814a388795bb2b9326f381d82294e497055d4e52b0404205520c81166a0444229e803e4fab362460fd264e24cf8b198d386f060b99"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-ce0de4b097b40f7bf7fc0f814a388795bb2b9326f381d82294e497055d4e52b0404205520c81166a0444229e803e4fab362460fd264e24cf8b198d386f060b99"' : 'data-bs-target="#xs-injectables-links-module-AppModule-ce0de4b097b40f7bf7fc0f814a388795bb2b9326f381d82294e497055d4e52b0404205520c81166a0444229e803e4fab362460fd264e24cf8b198d386f060b99"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ce0de4b097b40f7bf7fc0f814a388795bb2b9326f381d82294e497055d4e52b0404205520c81166a0444229e803e4fab362460fd264e24cf8b198d386f060b99"' :
                                        'id="xs-injectables-links-module-AppModule-ce0de4b097b40f7bf7fc0f814a388795bb2b9326f381d82294e497055d4e52b0404205520c81166a0444229e803e4fab362460fd264e24cf8b198d386f060b99"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BeehiveModule.html" data-type="entity-link" >BeehiveModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BeehiveModule-cf1025e4459eab7517ce7e720f44d4f70a4ad32a5d4e053375a9a798777dfaf6e4172acd9dde5ab149e56b90f7067e03c611b78f9cc16acfe74d533bc3a9ec65"' : 'data-bs-target="#xs-controllers-links-module-BeehiveModule-cf1025e4459eab7517ce7e720f44d4f70a4ad32a5d4e053375a9a798777dfaf6e4172acd9dde5ab149e56b90f7067e03c611b78f9cc16acfe74d533bc3a9ec65"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BeehiveModule-cf1025e4459eab7517ce7e720f44d4f70a4ad32a5d4e053375a9a798777dfaf6e4172acd9dde5ab149e56b90f7067e03c611b78f9cc16acfe74d533bc3a9ec65"' :
                                            'id="xs-controllers-links-module-BeehiveModule-cf1025e4459eab7517ce7e720f44d4f70a4ad32a5d4e053375a9a798777dfaf6e4172acd9dde5ab149e56b90f7067e03c611b78f9cc16acfe74d533bc3a9ec65"' }>
                                            <li class="link">
                                                <a href="controllers/BeehiveController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BeehiveController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BeehiveModule-cf1025e4459eab7517ce7e720f44d4f70a4ad32a5d4e053375a9a798777dfaf6e4172acd9dde5ab149e56b90f7067e03c611b78f9cc16acfe74d533bc3a9ec65"' : 'data-bs-target="#xs-injectables-links-module-BeehiveModule-cf1025e4459eab7517ce7e720f44d4f70a4ad32a5d4e053375a9a798777dfaf6e4172acd9dde5ab149e56b90f7067e03c611b78f9cc16acfe74d533bc3a9ec65"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BeehiveModule-cf1025e4459eab7517ce7e720f44d4f70a4ad32a5d4e053375a9a798777dfaf6e4172acd9dde5ab149e56b90f7067e03c611b78f9cc16acfe74d533bc3a9ec65"' :
                                        'id="xs-injectables-links-module-BeehiveModule-cf1025e4459eab7517ce7e720f44d4f70a4ad32a5d4e053375a9a798777dfaf6e4172acd9dde5ab149e56b90f7067e03c611b78f9cc16acfe74d533bc3a9ec65"' }>
                                        <li class="link">
                                            <a href="injectables/BeehiveRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BeehiveRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BeehiveService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BeehiveService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BeekeeperModule.html" data-type="entity-link" >BeekeeperModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BeekeeperModule-e162f61ea5a061232288ca9619b106dfeefe22c88f49a472b39bc7123f10ddcd15223e2c132a39b2be64087d3ad4b409197a4dac7d9a77165e5142892ea794f4"' : 'data-bs-target="#xs-controllers-links-module-BeekeeperModule-e162f61ea5a061232288ca9619b106dfeefe22c88f49a472b39bc7123f10ddcd15223e2c132a39b2be64087d3ad4b409197a4dac7d9a77165e5142892ea794f4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BeekeeperModule-e162f61ea5a061232288ca9619b106dfeefe22c88f49a472b39bc7123f10ddcd15223e2c132a39b2be64087d3ad4b409197a4dac7d9a77165e5142892ea794f4"' :
                                            'id="xs-controllers-links-module-BeekeeperModule-e162f61ea5a061232288ca9619b106dfeefe22c88f49a472b39bc7123f10ddcd15223e2c132a39b2be64087d3ad4b409197a4dac7d9a77165e5142892ea794f4"' }>
                                            <li class="link">
                                                <a href="controllers/BeekeeperController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BeekeeperController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BeekeeperModule-e162f61ea5a061232288ca9619b106dfeefe22c88f49a472b39bc7123f10ddcd15223e2c132a39b2be64087d3ad4b409197a4dac7d9a77165e5142892ea794f4"' : 'data-bs-target="#xs-injectables-links-module-BeekeeperModule-e162f61ea5a061232288ca9619b106dfeefe22c88f49a472b39bc7123f10ddcd15223e2c132a39b2be64087d3ad4b409197a4dac7d9a77165e5142892ea794f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BeekeeperModule-e162f61ea5a061232288ca9619b106dfeefe22c88f49a472b39bc7123f10ddcd15223e2c132a39b2be64087d3ad4b409197a4dac7d9a77165e5142892ea794f4"' :
                                        'id="xs-injectables-links-module-BeekeeperModule-e162f61ea5a061232288ca9619b106dfeefe22c88f49a472b39bc7123f10ddcd15223e2c132a39b2be64087d3ad4b409197a4dac7d9a77165e5142892ea794f4"' }>
                                        <li class="link">
                                            <a href="injectables/BeekeeperRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BeekeeperRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BeekeeperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BeekeeperService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BeeyardModule.html" data-type="entity-link" >BeeyardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BeeyardModule-8ffc61db30e7c9fdc2c4541d165ca201d61887f8c32166e9128fbf6868a6aba778b6d9cba845d3ed2e4f2cf065776160415332ae255e3da24a1509a53b2fc184"' : 'data-bs-target="#xs-controllers-links-module-BeeyardModule-8ffc61db30e7c9fdc2c4541d165ca201d61887f8c32166e9128fbf6868a6aba778b6d9cba845d3ed2e4f2cf065776160415332ae255e3da24a1509a53b2fc184"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BeeyardModule-8ffc61db30e7c9fdc2c4541d165ca201d61887f8c32166e9128fbf6868a6aba778b6d9cba845d3ed2e4f2cf065776160415332ae255e3da24a1509a53b2fc184"' :
                                            'id="xs-controllers-links-module-BeeyardModule-8ffc61db30e7c9fdc2c4541d165ca201d61887f8c32166e9128fbf6868a6aba778b6d9cba845d3ed2e4f2cf065776160415332ae255e3da24a1509a53b2fc184"' }>
                                            <li class="link">
                                                <a href="controllers/BeeyardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BeeyardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BeeyardModule-8ffc61db30e7c9fdc2c4541d165ca201d61887f8c32166e9128fbf6868a6aba778b6d9cba845d3ed2e4f2cf065776160415332ae255e3da24a1509a53b2fc184"' : 'data-bs-target="#xs-injectables-links-module-BeeyardModule-8ffc61db30e7c9fdc2c4541d165ca201d61887f8c32166e9128fbf6868a6aba778b6d9cba845d3ed2e4f2cf065776160415332ae255e3da24a1509a53b2fc184"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BeeyardModule-8ffc61db30e7c9fdc2c4541d165ca201d61887f8c32166e9128fbf6868a6aba778b6d9cba845d3ed2e4f2cf065776160415332ae255e3da24a1509a53b2fc184"' :
                                        'id="xs-injectables-links-module-BeeyardModule-8ffc61db30e7c9fdc2c4541d165ca201d61887f8c32166e9128fbf6868a6aba778b6d9cba845d3ed2e4f2cf065776160415332ae255e3da24a1509a53b2fc184"' }>
                                        <li class="link">
                                            <a href="injectables/BeeyardRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BeeyardRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BeeyardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BeeyardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientModule.html" data-type="entity-link" >ClientModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ClientModule-79d4dafcf5fc78789fd3078e20fb2802021cf05a8202b8e340ad4f5cd05286d97dcf05173deea026884f930b65b1f3d4842a17254ff831b44e0445699063f9f4"' : 'data-bs-target="#xs-controllers-links-module-ClientModule-79d4dafcf5fc78789fd3078e20fb2802021cf05a8202b8e340ad4f5cd05286d97dcf05173deea026884f930b65b1f3d4842a17254ff831b44e0445699063f9f4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClientModule-79d4dafcf5fc78789fd3078e20fb2802021cf05a8202b8e340ad4f5cd05286d97dcf05173deea026884f930b65b1f3d4842a17254ff831b44e0445699063f9f4"' :
                                            'id="xs-controllers-links-module-ClientModule-79d4dafcf5fc78789fd3078e20fb2802021cf05a8202b8e340ad4f5cd05286d97dcf05173deea026884f930b65b1f3d4842a17254ff831b44e0445699063f9f4"' }>
                                            <li class="link">
                                                <a href="controllers/ClientController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClientModule-79d4dafcf5fc78789fd3078e20fb2802021cf05a8202b8e340ad4f5cd05286d97dcf05173deea026884f930b65b1f3d4842a17254ff831b44e0445699063f9f4"' : 'data-bs-target="#xs-injectables-links-module-ClientModule-79d4dafcf5fc78789fd3078e20fb2802021cf05a8202b8e340ad4f5cd05286d97dcf05173deea026884f930b65b1f3d4842a17254ff831b44e0445699063f9f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClientModule-79d4dafcf5fc78789fd3078e20fb2802021cf05a8202b8e340ad4f5cd05286d97dcf05173deea026884f930b65b1f3d4842a17254ff831b44e0445699063f9f4"' :
                                        'id="xs-injectables-links-module-ClientModule-79d4dafcf5fc78789fd3078e20fb2802021cf05a8202b8e340ad4f5cd05286d97dcf05173deea026884f930b65b1f3d4842a17254ff831b44e0445699063f9f4"' }>
                                        <li class="link">
                                            <a href="injectables/ClientRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ClientService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HarvesthoneyModule.html" data-type="entity-link" >HarvesthoneyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HarvesthoneyModule-0776ca76b5caf960fffa83dce9e2f769ffba2c4d8da99b088e2119acaa85afe0ca40cc7fe3f9981d97182f5421a01a674fd59458f5658e16027e9fd97889657a"' : 'data-bs-target="#xs-controllers-links-module-HarvesthoneyModule-0776ca76b5caf960fffa83dce9e2f769ffba2c4d8da99b088e2119acaa85afe0ca40cc7fe3f9981d97182f5421a01a674fd59458f5658e16027e9fd97889657a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HarvesthoneyModule-0776ca76b5caf960fffa83dce9e2f769ffba2c4d8da99b088e2119acaa85afe0ca40cc7fe3f9981d97182f5421a01a674fd59458f5658e16027e9fd97889657a"' :
                                            'id="xs-controllers-links-module-HarvesthoneyModule-0776ca76b5caf960fffa83dce9e2f769ffba2c4d8da99b088e2119acaa85afe0ca40cc7fe3f9981d97182f5421a01a674fd59458f5658e16027e9fd97889657a"' }>
                                            <li class="link">
                                                <a href="controllers/HarvesthoneyController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HarvesthoneyController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HarvesthoneyModule-0776ca76b5caf960fffa83dce9e2f769ffba2c4d8da99b088e2119acaa85afe0ca40cc7fe3f9981d97182f5421a01a674fd59458f5658e16027e9fd97889657a"' : 'data-bs-target="#xs-injectables-links-module-HarvesthoneyModule-0776ca76b5caf960fffa83dce9e2f769ffba2c4d8da99b088e2119acaa85afe0ca40cc7fe3f9981d97182f5421a01a674fd59458f5658e16027e9fd97889657a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HarvesthoneyModule-0776ca76b5caf960fffa83dce9e2f769ffba2c4d8da99b088e2119acaa85afe0ca40cc7fe3f9981d97182f5421a01a674fd59458f5658e16027e9fd97889657a"' :
                                        'id="xs-injectables-links-module-HarvesthoneyModule-0776ca76b5caf960fffa83dce9e2f769ffba2c4d8da99b088e2119acaa85afe0ca40cc7fe3f9981d97182f5421a01a674fd59458f5658e16027e9fd97889657a"' }>
                                        <li class="link">
                                            <a href="injectables/HarvesthoneyRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HarvesthoneyRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HarvesthoneyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HarvesthoneyService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HoneycropModule.html" data-type="entity-link" >HoneycropModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HoneycropModule-b571a77190252be1f2196ce7e648f1f6384108fdda0222965219f4f3a3f29ac4bf4c0c609c3b361c67a0a7202a59ed6a923e624e6912442c608733ae5c214992"' : 'data-bs-target="#xs-controllers-links-module-HoneycropModule-b571a77190252be1f2196ce7e648f1f6384108fdda0222965219f4f3a3f29ac4bf4c0c609c3b361c67a0a7202a59ed6a923e624e6912442c608733ae5c214992"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HoneycropModule-b571a77190252be1f2196ce7e648f1f6384108fdda0222965219f4f3a3f29ac4bf4c0c609c3b361c67a0a7202a59ed6a923e624e6912442c608733ae5c214992"' :
                                            'id="xs-controllers-links-module-HoneycropModule-b571a77190252be1f2196ce7e648f1f6384108fdda0222965219f4f3a3f29ac4bf4c0c609c3b361c67a0a7202a59ed6a923e624e6912442c608733ae5c214992"' }>
                                            <li class="link">
                                                <a href="controllers/HoneycropController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HoneycropController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HoneycropModule-b571a77190252be1f2196ce7e648f1f6384108fdda0222965219f4f3a3f29ac4bf4c0c609c3b361c67a0a7202a59ed6a923e624e6912442c608733ae5c214992"' : 'data-bs-target="#xs-injectables-links-module-HoneycropModule-b571a77190252be1f2196ce7e648f1f6384108fdda0222965219f4f3a3f29ac4bf4c0c609c3b361c67a0a7202a59ed6a923e624e6912442c608733ae5c214992"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HoneycropModule-b571a77190252be1f2196ce7e648f1f6384108fdda0222965219f4f3a3f29ac4bf4c0c609c3b361c67a0a7202a59ed6a923e624e6912442c608733ae5c214992"' :
                                        'id="xs-injectables-links-module-HoneycropModule-b571a77190252be1f2196ce7e648f1f6384108fdda0222965219f4f3a3f29ac4bf4c0c609c3b361c67a0a7202a59ed6a923e624e6912442c608733ae5c214992"' }>
                                        <li class="link">
                                            <a href="injectables/HoneycropRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HoneycropRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HoneycropService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HoneycropService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductModule-fccbcd1120bd98da8c65f9541d52fe27981b3997e96b34db9186f0b7d3e8716e6f5fe2d3d8cb83f6ebc3eed2201191e7725674b2bfa144e6b5557c1963d461b8"' : 'data-bs-target="#xs-controllers-links-module-ProductModule-fccbcd1120bd98da8c65f9541d52fe27981b3997e96b34db9186f0b7d3e8716e6f5fe2d3d8cb83f6ebc3eed2201191e7725674b2bfa144e6b5557c1963d461b8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-fccbcd1120bd98da8c65f9541d52fe27981b3997e96b34db9186f0b7d3e8716e6f5fe2d3d8cb83f6ebc3eed2201191e7725674b2bfa144e6b5557c1963d461b8"' :
                                            'id="xs-controllers-links-module-ProductModule-fccbcd1120bd98da8c65f9541d52fe27981b3997e96b34db9186f0b7d3e8716e6f5fe2d3d8cb83f6ebc3eed2201191e7725674b2bfa144e6b5557c1963d461b8"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-fccbcd1120bd98da8c65f9541d52fe27981b3997e96b34db9186f0b7d3e8716e6f5fe2d3d8cb83f6ebc3eed2201191e7725674b2bfa144e6b5557c1963d461b8"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-fccbcd1120bd98da8c65f9541d52fe27981b3997e96b34db9186f0b7d3e8716e6f5fe2d3d8cb83f6ebc3eed2201191e7725674b2bfa144e6b5557c1963d461b8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-fccbcd1120bd98da8c65f9541d52fe27981b3997e96b34db9186f0b7d3e8716e6f5fe2d3d8cb83f6ebc3eed2201191e7725674b2bfa144e6b5557c1963d461b8"' :
                                        'id="xs-injectables-links-module-ProductModule-fccbcd1120bd98da8c65f9541d52fe27981b3997e96b34db9186f0b7d3e8716e6f5fe2d3d8cb83f6ebc3eed2201191e7725674b2bfa144e6b5557c1963d461b8"' }>
                                        <li class="link">
                                            <a href="injectables/ProductRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AddressController.html" data-type="entity-link" >AddressController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BeehiveController.html" data-type="entity-link" >BeehiveController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BeekeeperController.html" data-type="entity-link" >BeekeeperController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BeeyardController.html" data-type="entity-link" >BeeyardController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ClientController.html" data-type="entity-link" >ClientController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HarvesthoneyController.html" data-type="entity-link" >HarvesthoneyController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HoneycropController.html" data-type="entity-link" >HoneycropController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductController.html" data-type="entity-link" >ProductController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddressDto.html" data-type="entity-link" >AddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BeehiveDto.html" data-type="entity-link" >BeehiveDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BeekeeperDto.html" data-type="entity-link" >BeekeeperDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BeeyardDto.html" data-type="entity-link" >BeeyardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientDto.html" data-type="entity-link" >ClientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HarvesthoneyByBeehiveDto.html" data-type="entity-link" >HarvesthoneyByBeehiveDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HarvesthoneyByBeekeeperDto.html" data-type="entity-link" >HarvesthoneyByBeekeeperDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HarvesthoneyByBeeyardDto.html" data-type="entity-link" >HarvesthoneyByBeeyardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HarvesthoneyDto.html" data-type="entity-link" >HarvesthoneyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HoneycropDto.html" data-type="entity-link" >HoneycropDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductDto.html" data-type="entity-link" >ProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RelHarvestHoneycropDto.html" data-type="entity-link" >RelHarvestHoneycropDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrackingDto.html" data-type="entity-link" >TrackingDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AddressRepository.html" data-type="entity-link" >AddressRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AddressService.html" data-type="entity-link" >AddressService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BeehiveRepository.html" data-type="entity-link" >BeehiveRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BeehiveService.html" data-type="entity-link" >BeehiveService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BeekeeperRepository.html" data-type="entity-link" >BeekeeperRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BeekeeperService.html" data-type="entity-link" >BeekeeperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BeeyardRepository.html" data-type="entity-link" >BeeyardRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BeeyardService.html" data-type="entity-link" >BeeyardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientRepository.html" data-type="entity-link" >ClientRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientService.html" data-type="entity-link" >ClientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HarvesthoneyRepository.html" data-type="entity-link" >HarvesthoneyRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HarvesthoneyService.html" data-type="entity-link" >HarvesthoneyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HoneycropRepository.html" data-type="entity-link" >HoneycropRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HoneycropService.html" data-type="entity-link" >HoneycropService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductRepository.html" data-type="entity-link" >ProductRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Beehive.html" data-type="entity-link" >Beehive</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Beekeeper.html" data-type="entity-link" >Beekeeper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Beeyard.html" data-type="entity-link" >Beeyard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Client.html" data-type="entity-link" >Client</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Harvesthoney.html" data-type="entity-link" >Harvesthoney</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Honeycrop.html" data-type="entity-link" >Honeycrop</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});