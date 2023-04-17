import { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react';

const useCustomRef = <T>(initialValue: T): [MutableRefObject<T>, Dispatch<SetStateAction<T>>] => {
    const ref = useRef<T>(initialValue);
    const setRef = (args: T | ((original: T) => T)) => {
        if (typeof args === 'function') {
            const _args = args as (original: T) => T;
            ref.current = _args(ref.current);
        } else {
            ref.current = args;
        }
    };
    return [ref, setRef];
};

export default useCustomRef;
