import * as React from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  Left,
  Body,
  Title,
  Right,
} from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import SearchComponent from "@components/SearchComponent";
import { currentLanguage } from "../../../translations/CurrentLanguage";


// Style
import styles from "./styles";
import translation from "../../../translations/translation";
import LocalizedStrings from "react-native-localization";
let strings = new LocalizedStrings(translation);
// TODO: Make a future utils for measuring boys
export default class ItemListing extends React.PureComponent {
  constructor(props) {
    super(props);
    const { width, height } = Dimensions.get("window");
    this.state = { width, height };
  }

  navigate = () => {
    this.props.navigation.navigate("DrawerOpen");
  };

  onPressSearchButton = () => {
    this.props.itemMaintenanceStatusChange(true);
  };

  onLayout() {
    const { width, height } = Dimensions.get("window");
    this.setState({ width, height });
  }

  renderSearch() {
    const { onChangeText, itemMaintenanceStatusChange } = this.props;
    return (
      <SearchComponent
        status="Item"
        onChangeText={onChangeText}
        itemMaintenanceStatusChange={itemMaintenanceStatusChange}
      />
    );
  }

  renderSearchButton() {
    return (
      <Right>
        <TouchableOpacity onPress={this.onPressSearchButton}>
          <Icon name="search" size={30} style={styles.text} />
        </TouchableOpacity>
      </Right>
    );
  }

  renderHeader() {
    return (
      <Header hasTabs style={styles.header}>
        <Left>
          <TouchableOpacity onPress={this.navigate}>
            <Icon name="bars" size={25} color="white" style={styles.icon} />
          </TouchableOpacity>
        </Left>
        <Body style={styles.body}>
          <Title>{strings.Listings}</Title>
        </Body>
        {this.props.tabStatus === 0 ? this.renderSearchButton() : <Right />}
      </Header>
    );
  }

  render() {
      strings.setLanguage(currentLanguage().companyLanguage);
    return (
      <Container style={styles.container} onLayout={() => this.onLayout()}>
        {this.props.itemMaintenanceStatus
          ? this.renderSearch()
          : this.renderHeader()}
        <Tabs
          initialPage={0}
          onChangeTab={({ i, ref, from }) =>
            this.props.changeTabStatus(i.toString())
          }
        >
          <Tab
            heading={strings.Items}
            tabStyle={styles.tab}
            activeTabStyle={styles.tab}
            textStyle={styles.text}
            activeTextStyle={styles.text}
          >
            {this.props.itemTab}
          </Tab>
          <Tab
            heading={strings.Categories}
            tabStyle={styles.tab}
            activeTabStyle={styles.tab}
            textStyle={styles.text}
            activeTextStyle={styles.text}
          >
            {this.props.categoryTab}
          </Tab>
          <Tab
            heading={strings.Discounts}
            tabStyle={styles.tab}
            activeTabStyle={styles.tab}
            textStyle={styles.text}
            activeTextStyle={styles.text}
          >
            {this.props.discountTab}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
