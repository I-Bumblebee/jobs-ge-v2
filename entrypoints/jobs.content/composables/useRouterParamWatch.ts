import { watch } from 'vue';
import {NavigationFailure, RouteLocationRaw, useRoute, useRouter} from 'vue-router';

export function useRouteParamWatch(
    paramName: string,
    navigationHandler: (
        newParamValue: string | string[] | undefined,
        navigate: {
            push: (options: RouteLocationRaw) => Promise<void | NavigationFailure | undefined>,
            replace: (options: RouteLocationRaw) => Promise<void | NavigationFailure | undefined>,
        }
    ) => void,
    options: { immediate?: boolean } = { immediate: true }
) {
    const route = useRoute();
    const router = useRouter();

    const navigate = {
        push: (options: RouteLocationRaw) => router.push(options),
        replace: (options: RouteLocationRaw) => router.replace(options)
    };

    watch(
        () => route.params[paramName],
        (newParamValue) => {
            navigationHandler(newParamValue, navigate);
        },
        { immediate: options.immediate }
    );
}
