import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Users from "./components/Users";
import Posts from "./components/Posts";
import 'react-tabs/style/react-tabs.css';

const Search = () => {
  return (
    <>
      <main id="layoutSidenav_content">
        <Tabs>
          <TabList>
            <Tab>Users</Tab>
            <Tab>Posts</Tab>
          </TabList>
          <TabPanel>
            <Users></Users>
          </TabPanel>
          <TabPanel>
            <Posts></Posts>
          </TabPanel>
        </Tabs>
      </main>
    </>
  );
};

export default Search;
