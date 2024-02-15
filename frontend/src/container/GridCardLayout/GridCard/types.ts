import { ToggleGraphProps } from 'components/Graph/types';
import { UplotProps } from 'components/Uplot/Uplot';
import { OnClickPluginOpts } from 'lib/uPlotLib/plugins/onClickPlugin';
import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react';
import { UseQueryResult } from 'react-query';
import { ErrorResponse, SuccessResponse } from 'types/api';
import { Dashboard, Widgets } from 'types/api/dashboard/getAll';
import { ILog } from 'types/api/logs/log';
import { MetricRangePayloadProps } from 'types/api/metrics/getQueryRange';
import uPlot from 'uplot';

import { MenuItemKeys } from '../WidgetHeader/contants';
import { LegendEntryProps } from './FullView/types';

export interface GraphVisibilityLegendEntryProps {
	graphVisibilityStates: boolean[];
	legendEntry: LegendEntryProps[];
}

export interface WidgetGraphComponentProps extends UplotProps {
	widget: Widgets;
	queryResponse: UseQueryResult<
		SuccessResponse<MetricRangePayloadProps> | ErrorResponse
	>;
	errorMessage: string | undefined;
	name: string;
	onDragSelect: (start: number, end: number) => void;
	onClickHandler?: OnClickPluginOpts['onClick'];
	threshold?: ReactNode;
	headerMenuList: MenuItemKeys[];
	isWarning: boolean;
	graphVisibiltyState: boolean[];
	setGraphVisibility: Dispatch<SetStateAction<boolean[]>>;
	logs?: ILog[];
	handleEndReached?: (index: number) => void;
	isFetchingResponse: boolean;
}

export interface GridCardGraphProps {
	widget: Widgets;
	name: string;
	onDragSelect?: (start: number, end: number) => void;
	onClickHandler?: OnClickPluginOpts['onClick'];
	threshold?: ReactNode;
	headerMenuList?: WidgetGraphComponentProps['headerMenuList'];
	isQueryEnabled: boolean;
	variables?: Dashboard['data']['variables'];
	fillSpans?: boolean;
}

export interface GetGraphVisibilityStateOnLegendClickProps {
	options: uPlot.Options;
	isExpandedName: boolean;
	name: string;
}

export interface ToggleGraphsVisibilityInChartProps {
	graphsVisibilityStates: GraphVisibilityLegendEntryProps['graphVisibilityStates'];
	lineChartRef: MutableRefObject<ToggleGraphProps | undefined>;
}
