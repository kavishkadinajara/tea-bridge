import { title } from "@/components/primitives";
import { Counter } from "@/components/counter";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>
      <Counter />
    </div>
  );
}
