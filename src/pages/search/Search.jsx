import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Users from "./components/Users";
import Posts from "./components/Posts";
import "react-tabs/style/react-tabs.css";
import { useJsApiLoader } from "@react-google-maps/api";

const Search = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCNvROXqDQ9kDgUF5ErbXREjLXkJFUcC54"
  })
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
        <TabPanel></TabPanel>
      </Tabs>
    </main>
  );
};

export default Search;
