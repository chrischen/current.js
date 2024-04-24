%%raw("import { t } from '@lingui/macro'")

module Query = %relay(`
  query LocationPageQuery($id: ID!, $after: String, $first: Int, $before: String, $filters: EventFilters!) {
    location(id: $id) {
      name
      ...EventLocation_location
    }
    ...EventsListFragment @arguments(after: $after, first: $first, before: $before, filters: $filters)
  }
  `)
type loaderData = None
@module("react-router-dom")
external useLoaderData: unit => WaitForMessages.data<loaderData> = "useLoaderData"

@react.component
let make = () => {
  open Lingui.Util
  <WaitForMessages>
    {_ =>
      <Layout.Container>
        <h1>
          <div className="text-base leading-6 text-gray-500"> {t`Login with Line`} </div>
          <div className="mt-1 text-2xl font-semibold leading-6 text-gray-900">
            {t`Privacy Disclosure`}
          </div>
        </h1>
        <h2 className="mt-4 text-lg font-semibold leading-6 text-gray-900">
          {t`We will collect the following information from your Line account`}
        </h2>
        <dl className="">
          <dt className="mt-4 text-lg font-semibold leading-6 text-gray-900"> {t`Email Address`} </dt>
          <dd className="mt-2 text-base leading-6 text-gray-500">
            <ul className="list-disc list-inside">
              <li className="mt-1">
                {t`Notification of updates or cancellations to events (you can opt out)`}
              </li>
              <li className="mt-1">
                {t`Event organizers and other users cannot view your email`}
              </li>
            </ul>
          </dd>
          <dt className="mt-4 text-lg font-semibold leading-6 text-gray-900"> {t`Display Name`} </dt>
          <dd className="mt-2 text-base leading-6 text-gray-500">
          {t`Publicly displayed on event attendance lists`}
          </dd>
          <dt className="mt-4 text-lg font-semibold leading-6 text-gray-900"> {t`Profile Picture`} </dt>
          <dd className="mt-2 text-base leading-6 text-gray-500">
          {t`Publicly displayed on event attendance lists`}
          </dd>
        </dl>
        <a href="/login" className="block mt-4 text-2xl">{t`login with Line`}</a>
      </Layout.Container>}
  </WaitForMessages>
}
