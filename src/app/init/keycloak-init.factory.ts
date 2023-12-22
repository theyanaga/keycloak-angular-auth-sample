import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
    keycloak: KeycloakService
) {
    return () =>
        keycloak.init({
            config: {
                // url: 'http://localhost:8080' + '/auth',
                url: 'http://localhost:8080',
                realm: 'master',
                clientId: 'angular',
            }, initOptions: {
                checkLoginIframe: false,
            }
        } );
}
