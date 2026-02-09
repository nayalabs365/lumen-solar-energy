// Type declarations for Google Maps Extended Component Library

declare namespace JSX {
  interface IntrinsicElements {
    'gmp-place-autocomplete': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        type?: string;
        'component-restrictions-country'?: string;
      },
      HTMLElement
    >;
  }
}
