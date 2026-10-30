import {describe, expect, it} from "vitest";
import {findByDevice} from "../src/index";
import {mockDevice} from "./utils";

const deviceFor = (modelID = "TS0301", manufacturerName = "_TZE210_yqwse3h5") =>
    mockDevice({modelID, manufacturerName, applicationVersion: 96, endpoints: [{ID: 1}]});

describe("TS0301 dual rail", () => {
    it.each(["_TZE210_inpjmc0h", "_TZE210_yqwse3h5"])("preserves existing fingerprint %s", async (manufacturer) => {
        expect(await findByDevice(deviceFor("TS0301", manufacturer))).toMatchObject({model: "TS0301_dual_rail", vendor: "Tuya"});
    });

    it.each([
        ["D10110", "Yookee"],
        ["TS0301", "_TZE200_eatmkx5j"],
        ["YKV24SAED", "Other"],
        ["Other", "Yooksmart"],
        ["TS0301", "Yooksmart"],
    ])("does not broaden recognition to %s / %s", async (model, manufacturer) => {
        const definition = await findByDevice(deviceFor(model, manufacturer));
        expect(definition?.model).not.toBe("TS0301_dual_rail");
        expect(definition?.model).not.toBe("YKV24SAED");
    });

    it("recognizes the exact public Yooksmart identity without rewriting it", async () => {
        const device = deviceFor("YKV24SAED", "Yooksmart");
        const definition = await findByDevice(device);
        expect(definition).toMatchObject({model: "YKV24SAED", vendor: "Yooksmart"});
        expect(definition.endpoint(device)).toEqual({bottom: 1, top: 1});
        expect(device.modelID).toBe("YKV24SAED");
        expect(device.manufacturerName).toBe("Yooksmart");
    });
});
