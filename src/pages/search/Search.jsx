import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Users from "./components/Users";
import Posts from "./components/Posts";
import "react-tabs/style/react-tabs.css";
import ComingSoon from "../comingSoon/ComingSoon";

const Search = () => {
  return (
    <main id="layoutSidenav_content">
      <Tabs>
        <TabList>
          <Tab>Search Users</Tab>
          <Tab>Search Posts</Tab>
          <Tab>Search Tags</Tab>
        </TabList>
        <TabPanel>
          <Users />
        </TabPanel>
        <TabPanel>
          <Posts />
        </TabPanel>
        <TabPanel>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "70vh" }}
          >
            <ComingSoon />
          </div>
        </TabPanel>
      </Tabs>
    </main>
  );
};

export default Search;
