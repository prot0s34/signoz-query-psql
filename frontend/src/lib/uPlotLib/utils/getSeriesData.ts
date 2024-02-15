import { PANEL_TYPES } from 'constants/queryBuilder';
import { themeColors } from 'constants/theme';
import getLabelName from 'lib/getLabelName';
import { MetricRangePayloadProps } from 'types/api/metrics/getQueryRange';
import { QueryData } from 'types/api/widgets/getQuery';

import { generateColor } from './generateColor';
import getRenderer, { drawStyles, lineInterpolations } from './getRenderer';

const paths = (
	u: any,
	seriesIdx: number,
	idx0: number,
	idx1: number,
	extendGap: boolean,
	buildClip: boolean,
): any => {
	const s = u.series[seriesIdx];
	const style = s.drawStyle;
	const interp = s.lineInterpolation;

	const renderer = getRenderer(style, interp);

	return renderer(u, seriesIdx, idx0, idx1, extendGap, buildClip);
};

const getSeries = ({
	apiResponse,
	widgetMetaData,
	graphsVisibilityStates,
	panelType,
}: GetSeriesProps): uPlot.Options['series'] => {
	const configurations: uPlot.Series[] = [
		{ label: 'Timestamp', stroke: 'purple' },
	];

	const seriesList = apiResponse?.data.result || [];

	const newGraphVisibilityStates = graphsVisibilityStates?.slice(1);

	for (let i = 0; i < seriesList?.length; i += 1) {
		const { metric = {}, queryName = '', legend = '' } = widgetMetaData[i] || {};

		const label = getLabelName(
			metric,
			queryName || '', // query
			legend || '',
		);

		const color = generateColor(label, themeColors.chartcolors);

		const pointSize = seriesList[i].values.length > 1 ? 5 : 10;
		const showPoints = !(seriesList[i].values.length > 1);

		const seriesObj: any = {
			paths,
			drawStyle:
				panelType && panelType === PANEL_TYPES.BAR
					? drawStyles.bars
					: drawStyles.line,
			lineInterpolation: lineInterpolations.spline,
			show: newGraphVisibilityStates ? newGraphVisibilityStates[i] : true,
			label,
			fill: panelType && panelType === PANEL_TYPES.BAR ? color : undefined,
			stroke: color,
			width: 2,
			spanGaps: true,
			points: {
				size: pointSize,
				show: showPoints,
				stroke: color,
			},
		};

		configurations.push(seriesObj);
	}

	return configurations;
};

type GetSeriesProps = {
	apiResponse?: MetricRangePayloadProps;
	widgetMetaData: QueryData[];
	graphsVisibilityStates?: boolean[];
	panelType?: PANEL_TYPES;
};

export default getSeries;
