import React, { useEffect, useState } from 'react';
// @ts-ignore
import { MapView, MapStyles, Defaults } from 'wmlandscape';
// @ts-ignore
import { FeatureSwitchesProvider } from 'wmlandscape';
// @ts-ignore
import { FeatureSwitches, ModKeyPressedProvider } from 'wmlandscape';
// @ts-ignore
import { Converter } from 'wmlandscape';

type MapViewProps = {
  markdownText: string;
  mutateMapText(text:string): void; 
};

export const MapViewContainer = (props: MapViewProps) => {

  const {markdownText, mutateMapText} = props;

  let obsidianFeatureSwitches = {
		...FeatureSwitches.featureSwitches,
		showToggleFullscreen: false,
		enableQuickAdd: false,
		showMapToolbar: false,
		showMiniMap: false,
		allowMapZoomMouseWheel: false,
	};

  const [mapText, setMapText] = useState('');
	const [mapTitle, setMapTitle] = useState('Untitled Map');
	const [mapComponents, setMapComponents] = useState([]);
	const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
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

	const [mapCanvasDimensions, setMapCanvasDimensions] = useState({
		width: 500,
		height: 500,
	});

	const [mapEvolutionStates, setMapEvolutionStates] = useState(
		Defaults.EvolutionStages,
	);
	const [mapStyle, setMapStyle] = useState('plain');

	useEffect(() => {
		setMapDimensions({
			width: mapSize.width > 0 ? mapSize.width : 500,
			height: mapSize.height > 0 ? mapSize.height : 500,
		});
		setMapCanvasDimensions({
			width: mapSize.width > 0 ? mapSize.width * 0.92 : 500,
			height: mapSize.height > 0 ? mapSize.height : 500,
		})
	}, [mapSize]);

  useEffect(()=>{
    setMapText(markdownText);
  },[markdownText]);

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
			setMapSize(r.presentation.size);
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
        mapCanvasDimensions={mapCanvasDimensions}
        mapEvolutionStates={mapEvolutionStates}
        mapRef={null}
        mapText={mapText}
        mutateMapText={ (t: string) => mutateMapText(t)}
        setMetaText={() => console.log('set meta text not implemented')}
        metaText={() => console.log('meta text not implemented')}
        evolutionOffsets={Defaults.EvoOffsets}
        setHighlightLine={() => {}}
        setNewComponentContext={() => {}}
        
        />
    </ModKeyPressedProvider>
  </FeatureSwitchesProvider>;
};