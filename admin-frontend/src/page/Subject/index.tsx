import { Container } from "@radix-ui/themes";
import { BaseSubjectTable } from "./BaseSubjectTable";
import { SubSubjectTable } from "./SubSubjectTable";

export function Subject() {
  return (
    <Container className="sm:m-4 min-h-[80vh] sm:p-4 ">
      <BaseSubjectTable />
      <SubSubjectTable />
    </Container>
  );
}
