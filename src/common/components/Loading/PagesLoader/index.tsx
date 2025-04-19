import LoadPanel from "devextreme-react/cjs/load-panel";

export default function PagesLoader({
  isVisible = true,
}: {
  isVisible?: boolean;
}) {
  return (
    <LoadPanel visible={isVisible} shading shadingColor="rgba(0,0,0,0.4)" />
  );
}
