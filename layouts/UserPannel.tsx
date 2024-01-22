import { Avatar, Container } from "@mui/material";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

function UserPannel({ user }: Props) {
  return (
    <Container>
      <Avatar
        alt={user.name ? user.name : "Unset Name"}
        src={user.image ? user.image : "https://www.gravatar.com/avatar/?d=mp"}
      />
    </Container>
  );
}

export default UserPannel;
