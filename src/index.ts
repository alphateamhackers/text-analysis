
import { ATH } from "./types";

declare var module: any;

export const start = () => {
    console.log("Hello world!");
};

if (!module.parent) {
    start();
}
