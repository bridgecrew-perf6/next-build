import * as React from 'react';
import {
    getPathsFromContext,
    getResourceFromContext,
    getResourceTypeFromContext,
} from 'next-drupal';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { Core, FIELDS } from '@/pages/index';

export default function NodePage({ node }) {
    console.log(node)
    if (!node) return null;
    return (
        <>
            <div>
                {node.type === 'node--q_a' && <Core nodes={node} />}
            </div>

        </>
    );
}

export async function getStaticPaths(context) {
    return {
        paths: await getPathsFromContext(['node--q_a'], context),
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const type = await getResourceTypeFromContext(context);
    if (!type) {
        return {
            notFound: true,
        };
    }
    const params = new DrupalJsonApiParams();
    if (type === 'node--q_a') {
        params.addInclude([FIELDS]);
    }
    const node = await getResourceFromContext(type, context, {
        params: params.getQueryObject(),
    });
    if (!node?.status) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            node: node || null,
        },
        revalidate: 900,
    };
}

