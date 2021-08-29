import { useRouter } from "next/router";
import stringify from "qs-stringify";
import * as React from "react";
export const RETURN_HREF_QUERY_PARAM = "_UCR_return_href";

/**
 * During contextual routing browser URL will be controlled by Next Router's "as" prop
 * while the page actually rendered is defined by Next Router's "href" prop.
 *
 * During contextual navigation Next Router's behaves as follows:
 * router.asPath:   /item/3               reflects current URL and updates at each page change
 * router.pathname: /search/[terms]       stay the same as long as initial page doesn't change
 * router.query:    {"terms": "foo-bar"}  same as above
 *
 * @see https://github.com/toomuchdesign/next-use-contextual-routing#readme
 */
export function useModalRoute() {
  const router = useRouter();
  const returnHrefQueryParam = router.query[RETURN_HREF_QUERY_PARAM] as string;
  const watchedQuery = Object.assign({}, router.query);
  delete watchedQuery[RETURN_HREF_QUERY_PARAM];
  /*
   * After a page refresh there is no RETURN_HREF_QUERY_PARAM in router.query
   * RETURN_HREF_QUERY_PARAM is only available in those history entries where
   * contextual navigation is enabled (or WAS enabled in case history.back() is triggered)
   */
  const returnHref = returnHrefQueryParam ?? router.asPath;
  // @NOTE JSON.stringify might be replaced with any hashing solution
  const queryHash = JSON.stringify(watchedQuery);
  const createHref = React.useCallback(
    (extraParams: Parameters<typeof stringify>[0]) =>
      router.pathname +
      "?" +
      stringify(
        Object.assign({}, router.query, extraParams, {
          [RETURN_HREF_QUERY_PARAM]: returnHref,
        })
      ),
    // `queryHash` is used to detect changes in router.query
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryHash, returnHref]
  );

  const push = router.push;
  const close = React.useCallback(() => {
    push(returnHref, undefined, { shallow: true });
  }, [returnHref, push]);
  const open = React.useCallback(
    (params: Parameters<typeof stringify>[0], route: string) => {
      push(createHref(params), route, {
        shallow: true,
      });
    },
    [createHref, push]
  );

  return React.useMemo(
    () => ({ returnHref, createHref, open, close }),
    [open, close, createHref, returnHref]
  );
}
