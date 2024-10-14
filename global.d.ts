declare module '*.png' {
    const value: any;
    export default value;
}

declare module '*.jpg' {
    const value: any;
    export default value;
}

declare module '*.jpeg' {
    const value: any;
    export default value;
}

declare module '*.svg' {
    const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default value;
}
