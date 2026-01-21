import SelectApi from "./api-providers/SelectApi";
import { BadgeConfig } from "./badge/Badge";

export default function Index() {
  return (
    <div>
      <SelectApi />
      <BadgeConfig />
    </div>
  );
}