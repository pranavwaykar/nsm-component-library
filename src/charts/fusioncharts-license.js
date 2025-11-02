/* Initialize FusionCharts license once before using any charts. */
import FusionCharts from 'fusioncharts';

try {
  if (FusionCharts && FusionCharts.options && typeof FusionCharts.options.license === 'function') {
    FusionCharts.options.license({
      key: 'jxD3pocC5E3D4B1H1C1C2B1A6E6B3F1F2i1sB-22B2A6C-11zpnH-8G2C11rfwB4F1D4G2B1A2D3D6B1B2C4E1E4G2A1A4fyF-10E2F4D1F-7B3D5D1nmdG4A9A32bfuC6B5G4fB-7zA9C5A5D7E1E5E1H4A1C3A4B-16uwG2F4FF1ycrC7A3B4crC3UA7A5nhyD3G2F2A10B8D7E5D2B4F3G2I3B8A2a==',
      creditLabel: false,
    });
  }
} catch (err) {
  // swallow errors silently to avoid breaking non-chart environments
}

export default null;


