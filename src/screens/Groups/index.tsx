import { Header } from "@/components/Header";
import { Container } from "./styles";
import { Highlight } from "@/components/Highlight";
import { GroupCard } from "@/components/GroupCard";

export const Groups = () => {
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <GroupCard title="Clashzada" />
    </Container>
  );
};
