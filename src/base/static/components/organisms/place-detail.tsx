import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { findDOMNode } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import getExtentFromGeometry from "turf-extent";
import WebMercatorViewport from "viewport-mercator-project";

import { LargeTitle } from "../atoms/typography";
import PromotionBar from "../molecules/promotion-bar";
import MetadataBar from "../molecules/metadata-bar";
//import Survey from "./survey";
import PlaceDetailEditorBar from "../molecules/place-detail-editor-bar";
import TagBar from "../organisms/tag-bar";
import PlaceDetailEditor from "./place-detail-editor";
import {
  placeDetailViewModulesSelector,
  FormModule,
} from "../../state/ducks/forms";
import { Place, placeSelector } from "../../state/ducks/places";

import SubmittedFieldDetail from "../organisms/submitted-field-detail";
//import FieldSummary from "./field-summary";

// Flavor custom code
//import SnohomishFieldSummary from "./snohomish-field-summary";
//import PalouseFieldSummary from "./palouse-field-summary";
//import PBDurhamProjectProposalFieldSummary from "./pbdurham-project-proposal-field-summary";
//import KittitasFireReadyFieldSummary from "./kittitas-fire-ready-field-summary";

import { appConfigSelector, AppConfig } from "../../state/ducks/app-config";
import {
  CommentFormConfig,
  commentFormConfigSelector,
} from "../../state/ducks/forms-config";
import {
  supportConfigSelector,
  SupportConfig,
} from "../../state/ducks/support-config";
import {
  placeConfigSelector,
  PlaceConfig,
} from "../../state/ducks/place-config";
import {
  featuredPlacesSelector,
  FeaturedPlace,
} from "../../state/ducks/featured-places-config";
import {
  userSelector,
  hasAdminAbilitiesSelector,
  datasetsWithEditTagsAbilitySelector,
  datasetsWithUpdatePlacesAbilitySelector,
  User,
} from "../../state/ducks/user";
import {
  layoutSelector,
  updateSpotlightMaskVisibility,
  rightSidebarVisibilitySelector,
  Layout,
} from "../../state/ducks/ui";
import {
  removeFocusedGeoJSONFeatures,
  updateFocusedGeoJSONFeatures,
  updateLayerGroupVisibility,
  layerGroupsSelector,
  LayerGroups,
} from "../../state/ducks/map-style";
import {
  customComponentsConfigSelector,
  CustomComponentsConfig,
} from "../../state/ducks/custom-components-config";

import { getCategoryConfig } from "../../utils/config-utils";
import Util from "../../js/utils.js";

import { withTranslation, WithTranslation } from "react-i18next";
import eventEmitter from "../../utils/event-emitter";
import { MapViewportDiff } from "../../state/ducks/map";

const PromotionMetadataContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "24px",
});

type OwnProps = {
  contentPanelInnerContainerRef: React.RefObject<HTMLDivElement>;
  mapContainerRef: React.RefObject<HTMLElement>;
  placeId: string;
};

type PlaceDetailProps = OwnProps & WithTranslation;

const getWebMercatorViewport = node => {
  if (node instanceof Element) {
    const containerDims = node.getBoundingClientRect();

    return new WebMercatorViewport({
      width: containerDims.width,
      height: containerDims.height,
    });
  } else {
    throw new Error(
      "PlaceDetail.getWebMercatorViewport: could not find map container ref",
    );
  }
};

const PlaceDetail: React.FunctionComponent<PlaceDetailProps> = ({
  placeId,
  mapContainerRef,
  isGeocodingBarEnabled,
  contentPanelInnerContainerRef,
}) => {
  const detailViewFormModules = useSelector(placeDetailViewModulesSelector);
  //const [isSurveyFormSubmitting, setIsSurveyFormSubmitting] = React.useState<
  //  boolean
  //>(false);
  const [isEditModeToggled, setIsEditModeToggled] = React.useState<boolean>(
    false,
  );
  const user = useSelector(userSelector);
  const place = useSelector(state => placeSelector(state, placeId));
  const layerGroups = useSelector(layerGroupsSelector);
  const isTagBarEditable = useSelector(
    datasetsWithEditTagsAbilitySelector,
  ).includes(place.dataset);
  const datasetsWithUpdatePlacesAbility = useSelector(
    datasetsWithUpdatePlacesAbilitySelector,
  );
  const appConfig = useSelector(appConfigSelector);
  const dispatch = useDispatch();
  const layout: Layout = useSelector(layoutSelector);
  const placeConfig = useSelector(placeConfigSelector);
  const isPlaceDetailEditable =
    datasetsWithUpdatePlacesAbility.includes(place.dataset) ||
    // If the current user created this Place, grant editing abilities.
    // TODO: Make this configurable?
    (place &&
      place.submitter &&
      user.username === place.submitter.username &&
      user.id === place.submitter.id);
  const featuredPlaces = useSelector(featuredPlacesSelector);
  const supports = place.submission_sets.support;
  const comments = place.submission_sets.comments;
  //const categoryConfig = getCategoryConfig(
  //  this.props.placeConfig,
  //  place.location_type,
  //);
  const categoryConfig = {};
  const submitterName = place.submitter
    ? place.submitter.name
    : place.submitter_name || placeConfig.anonymous_name;
  const hasAdminAbilities = useSelector(state =>
    hasAdminAbilitiesSelector(state, place.dataset),
  );

  React.useEffect(() => {
    const featuredPlace = featuredPlaces.find(
      ({ placeId }) => placeId === place.id,
    );

    if (featuredPlace && featuredPlace.visibleLayerGroupIds) {
      layerGroups.allIds.forEach(layerGroupId =>
        dispatch(
          // Switch layers on for this featured place and hide all other
          // layers.
          updateLayerGroupVisibility(
            layerGroupId,
            featuredPlace.visibleLayerGroupIds.includes(layerGroupId),
          ),
        ),
      );
    }

    if (featuredPlace && featuredPlace.panTo) {
      const newViewport: MapViewportDiff = {
        latitude: featuredPlace.panTo[1],
        longitude: featuredPlace.panTo[0],
        transitionDuration: 3000,
      };
      if (featuredPlace.zoom) {
        newViewport.zoom = featuredPlace.zoom;
      }

      eventEmitter.emit("setMapViewport", newViewport);
    } else if (
      place.geometry.type === "LineString" ||
      place.geometry.type === "Polygon"
    ) {
      const extent = getExtentFromGeometry(place.geometry);
      const node = findDOMNode(mapContainerRef.current);
      const newViewport = getWebMercatorViewport(node).fitBounds(
        // WebMercatorViewport wants bounds in [[lng, lat], [lng lat]] form.
        [
          [extent[0], extent[1]],
          [extent[2], extent[3]],
        ],
        { padding: 50 },
      );

      eventEmitter.emit("setMapViewport", {
        latitude: newViewport.latitude,
        longitude: newViewport.longitude,
        transitionDuration: featuredPlace ? 3000 : 200,
        zoom: newViewport.zoom,
      });
    } else if (place.geometry.type === "Point") {
      const newViewport: MapViewportDiff = {
        latitude: place.geometry.coordinates[1],
        longitude: place.geometry.coordinates[0],
        transitionDuration: featuredPlace ? 3000 : 200,
      };
      if (featuredPlace && featuredPlace.zoom) {
        newViewport.zoom = featuredPlace.zoom;
      }

      eventEmitter.emit("setMapViewport", newViewport);
    }

    if (featuredPlace && !featuredPlace.spotlight) {
      dispatch(updateSpotlightMaskVisibility(false));
    } else {
      dispatch(updateSpotlightMaskVisibility(true));
    }

    // Focus this Place's feature on the map.
    const { geometry, ...rest } = place;
    dispatch(
      updateFocusedGeoJSONFeatures([
        {
          type: "Feature",
          geometry,
          properties: rest,
        },
      ]),
    );

    return () => {
      dispatch(removeFocusedGeoJSONFeatures());
    };
  }, [place, mapContainerRef, layout, dispatch, layerGroups.allIds]);

  // TODO: dissolve when flavor abstraction is ready
  const submittedFieldDetail = (
    <SubmittedFieldDetail place={place} formModules={detailViewFormModules} />
  );

  //if (
  //  this.props.customComponents.FieldSummary === "SnohomishFieldSummary" &&
  //  this.props.place.location_type === "conservation-actions"
  //) {
  //  fieldSummary = (
  //    <SnohomishFieldSummary
  //      fields={categoryConfig.fields}
  //      place={this.props.place}
  //    />
  //  );
  //} else if (
  //  this.props.customComponents.FieldSummary ===
  //  "KittitasFireReadyFieldSummary"
  //) {
  //  fieldSummary = (
  //    <KittitasFireReadyFieldSummary
  //      fields={categoryConfig.fields}
  //      place={this.props.place}
  //    />
  //  );
  //} else if (
  //  this.props.customComponents.FieldSummary === "PalouseFieldSummary" &&
  //  this.props.place.location_type === "reports"
  //) {
  //  fieldSummary = (
  //    <PalouseFieldSummary
  //      fields={categoryConfig.fields}
  //      place={this.props.place}
  //    />
  //  );
  //} else if (
  //  this.props.customComponents.FieldSummary ===
  //    "PBDurhamProjectProposalFieldSummary" &&
  //  ["projects", "cycle1-projects"].includes(
  //    this.props.place.location_type,
  //  )
  //) {
  //  fieldSummary = (
  //    <PBDurhamProjectProposalFieldSummary
  //      fields={categoryConfig.fields}
  //      place={this.props.place}
  //    />
  //  );
  //} else {
  //  fieldSummary = (
  //    <SubmittedFieldDetail
  //      place={this.props.place}
  //      formModules={this.props.detailViewFormModules}
  //    />
  //  );
  //}
  //const place = this.props.placeSelector(this.props.placeId);

  return (
    <div
      css={{
        marginTop:
          (isPlaceDetailEditable || isTagBarEditable) && layout === "desktop"
            ? "58px"
            : 0,
      }}
    >
      {(isPlaceDetailEditable || isTagBarEditable) && (
        <PlaceDetailEditorBar
          isAdmin={hasAdminAbilities}
          isEditModeToggled={isEditModeToggled}
          isPlaceDetailEditable={isPlaceDetailEditable}
          isTagBarEditable={isTagBarEditable}
          isGeocodingBarEnabled={isGeocodingBarEnabled}
          onToggleEditMode={() => {
            setIsEditModeToggled(!isEditModeToggled);
          }}
        />
      )}
      <TagBar
        isEditModeToggled={isEditModeToggled}
        isEditable={isTagBarEditable}
        placeTags={place.tags}
        dataset={place.dataset}
        placeUrl={place.url}
        placeId={place.id}
      />
      <LargeTitle
        css={css`
          margin-top: 0;
        `}
      >
        {place.title}
      </LargeTitle>
      <PromotionMetadataContainer>
        <MetadataBar
          label={categoryConfig.label}
          createdDatetime={place.created_datetime}
          submitterName={submitterName}
          submitterAvatarUrl={
            place.submitter && place.submitter.avatar_url
              ? place.submitter.avatar_url
              : undefined
          }
          numComments={comments.length}
          actionText={placeConfig.action_text}
        />
        <PromotionBar
          appConfig={appConfig}
          numSupports={supports.length}
          onSocialShare={service =>
            Util.onSocialShare({
              place,
              service,
              appConfig,
            })
          }
          userSupport={supports.find(
            support => support.user_token === user.token,
          )}
          placeUrl={place.url}
          placeId={place.id}
          currentUser={user}
        />
      </PromotionMetadataContainer>
      <div className="place-detail-view__clearfix" />
      {isEditModeToggled && isPlaceDetailEditable ? (
        <PlaceDetailEditor
          place={place}
          contentPanelInnerContainerRef={contentPanelInnerContainerRef}
        />
      ) : (
        submittedFieldDetail
      )}
      {/* <Survey
          placeUrl={this.props.focusedPlace.url}
          placeId={this.props.focusedPlace.id}
          datasetSlug={this.props.focusedPlace.datasetSlug}
          currentUser={this.props.currentUser}
          isEditModeToggled={this.props.isEditModeToggled}
          isEditable={this.state.isPlaceDetailEditable}
          isSubmitting={this.state.isSurveyEditFormSubmitting}
          comments={comments}
          onMountTargetResponse={this.onMountTargetResponse.bind(this)}
          submitter={this.props.focusedPlace.submitter}
        /> */}
    </div>
  );
};

export default withTranslation("PlaceDetail")(PlaceDetail);
