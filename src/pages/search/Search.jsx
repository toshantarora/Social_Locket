import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Users from "./components/Users";
import Posts from "./components/Posts";
import "react-tabs/style/react-tabs.css";

const Search = () => {
  return (
    <main id="layoutSidenav_content">
      <Tabs>
        <TabList>
          <Tab>Search Users</Tab>
          <Tab>Search Posts</Tab>
          <Tab>Search Filter</Tab>
        </TabList>
        <TabPanel>
          <Users />
        </TabPanel>
        <TabPanel>
          <Posts />
        </TabPanel>
      </Tabs>
    </main>
  );
};

export default Search;
