export type PagesType = 'dashboard' | 'tasks' | 'notes';

export const PagesEnum: Record<PagesType, PagesType> = {
	dashboard: 'dashboard',
	tasks: 'tasks',
	notes: 'notes',
};

export interface PagesProps {
	pageName: PagesType;
}
