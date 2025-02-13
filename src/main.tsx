import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AblyProvider } from "ably/react";
import { nanoid } from "nanoid";
import { Realtime } from "ably";
import Spaces from "@ably/spaces";

import Layout from "./components/Layout";
import Home from "./routes/Home";
import LiveCursors from "./routes/LiveCursors";
import AvatarStack from "./routes/AvatarStack";
import EmojiReactions from "./routes/EmojiReactions";
import UserClaims from "./routes/UserClaims";
import MemberLocation from "./routes/MemberLocation";
import ComponentLocking from "./routes/ComponentLocking";

import "./styles/global.css";
import "./styles/container.css";

const client = new Realtime.Promise({
  clientId: nanoid(),
  key: import.meta.env.VITE_ABLY_KEY,
});

const spaces = new Spaces(client);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Mismatch between react-router-dom and latest react
  // See https://github.com/remix-run/remix/issues/7514
  // @ts-ignore
  <AblyProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/live-cursors"
            element={<LiveCursors spaces={spaces} />}
          />
          <Route
            path="/component-locking"
            element={<ComponentLocking spaces={spaces} />}
          />
          <Route
            path="/member-location"
            element={<MemberLocation spaces={spaces} />}
          />
          <Route
            path="/avatar-stack"
            element={<AvatarStack spaces={spaces} />}
          />
          <Route path="/emoji-reactions" element={<EmojiReactions />} />
          <Route path="/user-claims" element={<UserClaims />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AblyProvider>,
);
