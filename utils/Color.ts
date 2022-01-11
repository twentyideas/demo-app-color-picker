export class Color {
    /**
     * @param r Red from 0 to 255
     * @param g Green from 0 to 255
     * @param b Blue from 0 to 255
     * @param a Alpha (transparency)
     */
    constructor(readonly r: number, readonly g: number, readonly b: number, readonly a: number = 1) {
        if (this.a < 0 || this.a > 1) {
            throw new Error("Alpha transparency out of bounds: must be between 0 and 1");
        }
        if (Math.min(r, g, b) < 0 || Math.max(r, g, b) > 255) {
            throw new Error("RGB value out of bounds: must be between 0 and 255");
        }
    }

    static fromHsva(hue: number, saturation: number, value: number, alpha: number = 1) {
        const rgb: [number, number, number] = [0, 0, 0];

        const hPos = hue / 120;
        const iMax = Math.round(hPos),
            iMid = iMax > hPos? iMax - 1 : iMax + 1,
            iMin = iMax > hPos? iMax + 1 : iMax - 1;

        const cMax = value / 100 * 255;
        const cMin = cMax * (100 - saturation) / 100;
        const cMid = cMin + ( Math.abs(iMax - hPos) * 2 * (cMax - cMin) );

        rgb[(3 + iMax) % 3] = Math.round(cMax);
        rgb[(3 + iMid) % 3] = Math.round(cMid);
        rgb[(3 + iMin) % 3] = Math.round(cMin);

        return new Color(...rgb, alpha);
    }

    static fromHue(hue: number) {
        return Color.fromHsva(hue, 100, 100);
    }

    static fromHexString(hex: string) {
        const m = hex.match(/^#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);

        if (!m) {
            throw new Error(hex + " is not a valid hexadecimal value");
        }

        return new Color(
            parseInt(m[1], 16),
            parseInt(m[2], 16),
            parseInt(m[3], 16));
    }

    /**
     * Value from 0 - 100
     */
    get value(): number {
        const max = Math.max(this.r, this.g, this.b);
        return Math.round((max / 255) * 100);
    }

    /**
     * Saturation from 0 - 100
     */
    get saturation(): number {
        const rgb = [this.r, this.g, this.b];
        const max = Math.max(...rgb);
        const min = Math.min(...rgb);
        return Math.round(100 * (max - min) / max);
    }

    /**
     * Alpha from 0 to 1
     */
    get alpha(): number {
        return this.a;
    }

    /**
     * Hue from 0 - 360
     *
     * I figured this out on my own (through trial and error...) but here's an article that basically validates my logic:
     * http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
     */
    get hue(): number {
        const rgb = [this.r, this.g, this.b];
        const max = Math.max(...rgb);
        const min = Math.min(...rgb);

        let hue = 0;
        let foundMax = false;
        for (let i of [0, 1, 2]) {
            if (rgb[i] == max && !foundMax) {
                hue += i * 120;
                foundMax = true;
            } else if (rgb[i] > min) {
                let sign = foundMax? 1 : -1;

                if (i == rgb.length - 1 && foundMax) {
                    hue = 360;
                    sign = -1;
                }

                hue += sign * ((rgb[i] - min) / (max - min)) * 60;
            }
        }

        return Math.round(hue);
    }

    toArray(): [number, number, number, number] {
        return [this.r, this.g, this.b, this.a];
    }

    /**
     * Hex value (without transparency)
     */
    toHex(): string {
        return "#" + ("000000" + ((this.r << 16) | (this.g << 8) | this.b).toString(16)).slice(-6).toUpperCase();
    }

    toString() {
        return "rgba(" + this.toArray().join(', ') + ")";
    }

    /**
     * Get the pure hue version of this color
     */
    getHueColor() {
        return Color.fromHue(this.hue);
    }
}
