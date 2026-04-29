import handler from "./api/index.js"; // مسیر فایل اصلی‌ات

function nodeLikeRes() {
  let headers = new Headers();
  let status = 200;
  let body: Uint8Array | string = "";

  return {
    setHeader: (k: string, v: string) => headers.set(k, v),
    status: (s: number) => {
      status = s;
      return this;
    },
    send: (b: any) => {
      body = b;
    },
    end: (b?: any) => {
      if (b) body = b;
    },
    _getResponse: () => new Response(body, { status, headers }),
  };
}

Deno.serve(async (request) => {
  const url = new URL(request.url);

  // شبیه‌سازی req
  const req = {
    method: request.method,
    headers: Object.fromEntries(request.headers),
    url: url.pathname + url.search,
  };

  // شبیه‌سازی res
  const res: any = nodeLikeRes();

  await handler(req, res);

  return res._getResponse();
});
