export default defineUnlistedScript(() => {
    const dummy: any = new Proxy(() => dummy, {
        get: (target, prop) => {
            if (prop === Symbol.toPrimitive) {
                return () => 0;
            }
            return dummy;
        },
        apply: () => dummy,
        set: () => true,
    });

    (window as any).$ = (window as any).jQuery = dummy;
});
