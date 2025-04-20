import LoadPanel from "devextreme-react/cjs/load-panel";

export default function PagesLoader({
  isVisible = true,
  shading = true,
}: {
  isVisible?: boolean;
  shading?: boolean;
}) {
  return (
    <LoadPanel
      visible={isVisible}
      shading={shading}
      shadingColor="rgba(0,0,0,0.4)"
    />
  );
}
