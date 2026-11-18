import { afterEach, describe, expect, it, vi } from "vitest";
import { conceptUri, getCodelist } from "./api";

afterEach(() => vi.unstubAllGlobals());

describe("getCodelist", () => {
  it("reads a WMDS codelist, with each concept's URI on https", async () => {
    const csv = [
      "id,title,description,url",
      'landFixed,Land (fixed),"Fixed, on land",https://codes.wmo.int/wmdr/FacilityType',
      "airFixed,,,http://codes.wmo.int/wmdr/FacilityType/",
      ",Empty,,https://codes.wmo.int/wmdr/FacilityType",
    ].join("\n");
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: true, text: () => Promise.resolve(csv) })));

    expect(await getCodelist("FacilityType")).toEqual([
      { code: "landFixed", label: "Land (fixed)", id: "https://codes.wmo.int/wmdr/FacilityType/landFixed", description: "Fixed, on land" },
      { code: "airFixed", label: "airFixed", id: "https://codes.wmo.int/wmdr/FacilityType/airFixed", description: "" },
    ]);
  });

  it("keeps a URI that already names the concept", () => {
    expect(conceptUri("https://www.iso.org/obp/ui/#iso:code:3166:AF", "004")).toBe("https://www.iso.org/obp/ui/#iso:code:3166:AF");
    expect(conceptUri("http://codes.wmo.int/wmdr/IssuerOfIdentifier/20000", "20000")).toBe("https://codes.wmo.int/wmdr/IssuerOfIdentifier/20000");
    expect(conceptUri("", "004")).toBe("");
  });
});
