import React, { useEffect, useState } from 'react';
import { MapView, MapStyles, Defaults } from 'wmlandscape';
import { FeatureSwitchesProvider } from 'wmlandscape';
import { FeatureSwitches, ModKeyPressedProvider } from 'wmlandscape';
import { Converter } from 'wmlandscape';

type MapViewProps = {
  mapText: string;
};

export const MapViewContainer = (props: MapViewProps) => {

  const {mapText} = props;

  let obsidianFeatureSwitches = {
		...FeatureSwitches.featureSwitches,
		showToggleFullscreen: false,
	};

	const [mapTitle, setMapTitle] = useState('Untitled Map');
	const [mapComponents, setMapComponents] = useState([]);
	const [mapSubMaps, setMapSubMaps] = useState([]);
	const [mapMarkets, setMarkets] = useState([]);
	const [mapEcosystems, setEcosystems] = useState([]);
	const [mapEvolved, setMapEvolved] = useState([]);
	const [mapPipelines, setMapPipelines] = useState([]);
	const [mapAnchors, setMapAnchors] = useState([]);
	const [mapNotes, setMapNotes] = useState([]);
	const [mapUrls, setMapUrls] = useState([]);
	const [mapLinks, setMapLinks] = useState([]);
	const [mapAttitudes, setMapAttitudes] = useState([]);
	const [mapAnnotations, setMapAnnotations] = useState([]);
	const [mapAccelerators, setMapAccelerators] = useState([]);
	const [mapMethods, setMapMethods] = useState([]);
	const [mapAnnotationsPresentation, setMapAnnotationsPresentation] = useState(
		[],
	);
  const [mapYAxis, setMapYAxis] = useState({});

	const [mapDimensions, setMapDimensions] = useState({
		width: 500,
		height: 500,
	});
	const [mapEvolutionStates, setMapEvolutionStates] = useState(
		Defaults.EvolutionStages,
	);
	const [mapStyle, setMapStyle] = useState('plain');

  useEffect(() => {
		try {
			var r = new Converter(obsidianFeatureSwitches).parse(mapText);
			setMapTitle(r.title);
			setMapAnnotations(r.annotations);
			setMapAnchors(r.anchors);
			setMapNotes(r.notes);
			setMapComponents(r.elements);
			setMapSubMaps(r.submaps);
			setMarkets(r.markets);
			setEcosystems(r.ecosystems);
			setMapEvolved(r.evolved);
			setMapPipelines(r.pipelines);
			setMapLinks(r.links);
			setMapUrls(r.urls);
			setMapMethods(r.methods);
			setMapAttitudes(r.attitudes);
			setMapStyle(r.presentation.style);
			setMapAccelerators(r.accelerators);
			setMapYAxis(r.presentation.yAxis);
			setMapAnnotationsPresentation(r.presentation.annotations);
			setMapEvolutionStates({
				genesis: { l1: r.evolution[0].line1, l2: r.evolution[0].line2 },
				custom: { l1: r.evolution[1].line1, l2: r.evolution[1].line2 },
				product: { l1: r.evolution[2].line1, l2: r.evolution[2].line2 },
				commodity: { l1: r.evolution[3].line1, l2: r.evolution[3].line2 },
			});
		} catch (err) {
			console.log(`Invalid markup on line ${1 + err.line}, could not render.`);
		}
	}, [mapText]);


  return <FeatureSwitchesProvider value={obsidianFeatureSwitches}>
    <ModKeyPressedProvider>
      <MapView 
        mapTitle={mapTitle}
        mapComponents={mapComponents}
        mapMarkets={mapMarkets}
        mapEcosystems={mapEcosystems}
        mapSubMaps={mapSubMaps}
        mapEvolved={mapEvolved}
        mapPipelines={mapPipelines}
        mapAnchors={mapAnchors}
        mapLinks={mapLinks}
        mapAttitudes={mapAttitudes}
        mapAccelerators={mapAccelerators}
        launchUrl={() => {}}
        mapNotes={mapNotes}
        mapAnnotations={mapAnnotations}
        mapAnnotationsPresentation={mapAnnotationsPresentation}
        mapMethods={mapMethods}
        mapStyleDefs={MapStyles.Plain}
        mapYAxis={mapYAxis}
        mapDimensions={mapDimensions}
        mapCanvasDimensions={mapDimensions}
        mapEvolutionStates={mapEvolutionStates}
        mapRef={null}
        mapText={mapText}
        mutateMapText={() => {}}
        setMetaText={() => console.log('set meta text not implemented')}
        metaText={() => console.log('meta text not implemented')}
        evolutionOffsets={Defaults.EvoOffsets}
        setHighlightLine={() => {}}
        setNewComponentContext={() => {}}
        
        />
    </ModKeyPressedProvider>
  </FeatureSwitchesProvider>;
};