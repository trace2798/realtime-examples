import { useState } from "react";
import dayjs from "dayjs";
import type { SpaceMember } from "@ably/spaces";

import Avatars from "./Avatars";
import relativeTime from "dayjs/plugin/relativeTime";
import { getMemberName } from "../../commonUtils/mockNames";
import { getMemberColor } from "../../commonUtils/mockColors";
import useSpaces from "../../commonUtils/useSpaces";
import useSpaceMembers from "../../commonUtils/useSpaceMembers";
import type { Member } from "./utils/helpers";

dayjs.extend(relativeTime);

const AvatarStack = ({ spaceName }: { spaceName: string }) => {
  const [name, setName] = useState(getMemberName);
  const [memberColor, setMemberColor] = useState(getMemberColor);

  /** 💡 Get a handle on a space instance 💡 */
  const space = useSpaces({ name, memberColor });

  /** 💡 Get all members in the space 💡 */
  const { otherMembers } = useSpaceMembers(space);

  return (
    <div
      className="w-full flex justify-center relative rounded-2xl bg-white"
      id="avatar-stack"
    >
      <div className="flex items-center">
        {/** 💡 Stack of first 5 user avatars including yourself.💡 */}
        <Avatars otherUsers={otherMembers as Member[]} />
      </div>
    </div>
  );
};
export default AvatarStack;
