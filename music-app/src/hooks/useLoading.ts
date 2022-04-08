import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";

NProgress.configure({
    showSpinner: false,
})

const useLoading = () => {
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", () => NProgress.start());
        router.events.on("routeChangeComplete", () => NProgress.done());
    
        return () => {
          router.events.off("routeChangeStart", () => NProgress.start());
          router.events.off("routeChangeComplete", () => NProgress.done());
        }
    }, [router.events])
}

export default useLoading