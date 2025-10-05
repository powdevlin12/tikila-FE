export interface FooterColumn {
	id: number;
	title: string;
	position: number;
	footerLinks?: FooterLink[];
	createdAt: Date;
}

export interface FooterLink {
	id?: number;
	title: string;
	url?: string;
	orderPosition?: number;
	footerColumnId?: number;
	footerColumn?: FooterColumn;
	createdAt?: Date;
}
