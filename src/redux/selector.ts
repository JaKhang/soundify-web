import {useAppSelector} from "@redux/store.ts";

export const useAuthSelector = () => {
    return useAppSelector(state => state.auth)
}

export const useLayoutSelector = () => {
    return useAppSelector(state => state.layout)
}

export const usePlaySelector = () => {
    return useAppSelector(state => state.play)
}



