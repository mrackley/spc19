export interface ILink {
  Title: string;
  Description: string;
  LinkUrl: string;
  BackgroundUrl: string;
}

export class Link implements ILink {
  constructor(
    public Title: string = "",
    public Description: string = "",
    public LinkUrl: string = "",
    public BackgroundUrl: string = ""
  ){}
}