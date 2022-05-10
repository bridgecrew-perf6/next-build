## Scope and Overview

This is a living document describing the scope, approach, resources, and schedule for the testing activities of the [Next-Build project](https://github.com/department-of-veterans-affairs/next-build/). In it, we'll define our goals, what will be tested, what will be used to test, when and by whom these tests will be executed, and why these choices have been made.

The **Next-Build** project is a new, React-based content build system intended to provide a modern frontend development framework to support the accelerated publishing initiative. There are numerous stakeholders here: frontend engineers, CMS engineers, engineers on other teams, editors, and of course, veterans and caregivers. This project is expected to serve these stakeholders in many ways, and to do so reliably and consistently.

Pushing a new commit to the `main` branch implies a statement about quality; that the team has engaged in a reasonable amount of effort to ensure that this new commit doesn't cause any new issues, reintroduce any old ones, violate any standards, flout any best practices, or in any other way introduce new unpleasantness to life or work. This test strategy is geared at helping us achieve and maintain a consistent level of quality through automated tests, the tooling needed for those tests, and following best practices.

This document should be reviewed, edited, and approved by the Next-Build development team prior to any substantial work on tests or the testing infrastructure. It should also be updated to reflect changes in how the team and other contributors approach testing in practice, to acknowledge the inevitable conflicts and special cases that crop up over the lifetime of the project, and as the vision of the project and its concerns evolve.

## Definitions

The following terms are defined as they will be used within this document.

- **Accessibility Testing**: Tests measuring the compliance of the system with various guidelines, standards, and practices aimed at reducing discomfort and maximizing usability and inclusiveness.

- **Behavior-Driven Development**: An approach to development built around specifying behavioral contracts for a system and developing the system to function in strict adherence to those contracts. This should be restricted to user-facing behaviors such as the UI, as these tests are costly in terms of resources.

- **Behavioral Testing**: Tests that determine whether the system as a whole acts in accordance with a behavioral contract. These tests are often specified in a syntax that is more friendly to non-engineers, like Cucumber, as part of Behavior-Driven Development.

- **Boundary Testing**: (not to be confused with **Boundary Value Testing**) Similar to Learning Testing, tests that cover the specific surface of a third-party module's API that is actually in use. Very useful for testing module updates and as sanity checks, sources of minimally reproducible examples, etc.

- **Boundary Value Analysis** or **Boundary Value Testing**: Ensuring that values that form "boundaries" of different behaviors are included in test data, to guard against off-by-one errors, margin issues, and other defects that can occur when execution paths branch.

- **End-to-End Testing**: Tests that cover the system as a whole, ensuring that it and its third-party code and services and all other dependencies function correctly.

- **Integration Testing**: Tests that cover the operation of multiple units. Here, an integration test should not involve third-party code or services; these should be mocked, stubbed, or monkey-patched out. These won't make sense in all cases, but are valuable for building confidence in a system of units.

- **Learning Testing**: Tests that might be written while learning a third-party module's API. Quickstarts, demos, etc. Valuable and worth keeping around, especially for testing updates to upstream modules, and should be encouraged!

- **Linting**: A form of **Static Analysis** focusing on the syntactic validity, stylistic consistency, and idiomaticity of the source code.

- **Load Testing**: Tests measuring how the entire system behaves under substantial load.

- **Performance Testing**: Tests measuring the raw performance of a specific piece of code, with a focus on identifying bottlenecks or performance regressions.

- **Regression Testing**: Tests that guard against the recurrence of a previously encountered defect or performance issue.

- **Static Analysis**: Automated inspection of the codebase that does not involve execution of code. For instance, analyzing the cyclomatic complexity of a function, ensuring that a variable will be defined before it is accessed along all possible code paths, **linting**, and so forth.

- **Static Testing**: Tests using **Static Analysis** to assess the quality of the codebase and identify issues.

- **Test Coverage**: A metric indicating what percentage of lines, statements, expressions, logical branches, etc are exercised by a test suite.

- **Unit Testing**: Tests that cover our smallest relevant units of logic, generally functions. Unit tests should not involve third-party code or services; these should be mocked, stubbed, or monkey-patched out.

## Approach

The **Next-Build** project is a fully-modern Javascript project (read: complex, with transpilation, numerous modules, React components, CSS-in-JS, etc). This and the breadth and importance of its mission lead to a substantial QA challenge.

We'll address this challenge with the following high-level approach:

- **Codebase Quality**: Assist developers and reviewers by maintaining a consistent level of quality.

- **Product Integrity**: Protect downstream consumers and users by testing our output.

- **Documentation and Transparency**: Document our assumptions about third-party modules, report our metrics, and stay transparent.

### Codebase Quality

- **Static Testing**: Use type checking, linting, and other forms of static analysis to reduce the prevalence of common programming bugs, enforce stylistic consistency to guard against developer confusion, and prevent the accumulation of cruft.

- **Unit Testing**: Make writing unit tests easy, clean, and intuitive. Reducing the burden of writing unit tests should have dramatic positive effects on confidence in the codebase.

- **Integration Testing**: Support and encourage writing integration tests for improving confidence in internal systems.

- **Test Coverage**: Aim for 100% test coverage for unit and integration tests. Accept no less than the current coverage, minus a percentage point or two.

- **Regression Testing**: Require that bugfixes include regression tests to prevent the bug from emerging again.

#### Static Testing

#### Unit Testing

#### Integration Testing

#### Test Coverage

Coverage metrics helps us in a few ways. It gives us an objective figure we can use to describe the breadth of our automated test coverage, identifies areas where we're lacking tests, and can inform how we allocate our QA resources.

More coverage is generally better, although there may be diminishing returns to testing certain pieces of code due to factors like lack of complexity, the contexts in which that code is executed, etc.

Coverage measurement and reporting is included in Jest via Istanbul. Istanbul measures code coverage for statements, branches, functions, and lines, and reports uncovered lines. Coverage can be configured via Jest's [`collectCoverageFrom`](https://jestjs.io/docs/configuration#collectcoveragefrom-array) and [`coverageThreshold`](https://jestjs.io/docs/configuration#coveragethreshold-object) options. The coverage thresholds should generally be set to about 2% under the current values, with the idea that these numbers will increase over time.

We should consider carefully before lowering code coverage thresholds. If we have a large section of code where coverage is substantially less or substantially more important, we should add a new path and thresholds to `collectCoverageFrom`, like so:

```json
    "coverageThreshold": {
      "global": {
        "branches": 85,
        "functions": 80,
        "lines": 90,
        "statements": 80
      },
      "./src/components/": {
        "branches": 40,
        "statements": 40
      }
    }
```

This should allow us some flexibility in dealing with more and less critical sections of code. Note that this will affect `global` coverage metrics, throwing off recorded values and probably necessitating adjustment to the thresholds, so this should be used thoughtfully.

#### Regression Testing

Regression testing is not a separate class or suite of tests, but rather a general guideline; when we fix a bug, we should not only fix the causes of the bug but also add or extend tests to guard against their reappearance. Bugs can be embarrassing, and a recurring bug is very embarrassing. We can't really automate a check for adding regression tests for bug fixes, but we can agree to expect them as a matter of policy.

### Product Integrity

- **End-to-End Testing**: Make writing end-to-end tests straightforward, efficient, and effective. We should never fear that merging a PR will have an adverse effect on our users.

- **Behavioral Testing**: Insist on tests covering adherence to behavioral contracts. We must be able to confirm consistency of the end user experience without manual testing.

- **Accessibility Testing**: We have a legal and moral responsibility to adhere to guidelines and best practices.

- **Visual Regression Testing**: We should guard against unexpected changes in visual appearance.

- **Load Testing**: Guard against performance regressions and identify bottlenecks before they cause issues.

#### End-to-End Testing

#### Behavioral Testing

#### Accessibility Testing

#### Visual Regression Testing

#### Load Testing

### Documentation and Transparency

- **Learning Testing**: When a new module or API is added to the codebase, learn it by writing tests rather than in throwaway scripts or playgrounds, and keep them in the codebase!

- **Boundary Testing**: Identify critical functionality, API schemas, and so forth, and write tests to confirm their content and behavior.

- **Reporting and Logging**: Metrics should be reported upstream and stored so that we can directly perceive and compare performance of the tests and the application itself over time.

#### Learning Testing

#### Boundary Testing

Boundary tests aren't always practical, but might be in this case; we're retrieving content from a very specific CMS with a constantly evolving content and structure. It would be nice to be able to validate the CMS' response to various API queries against stored responses. Fortunately, Jest's [snapshots](https://jestjs.io/docs/snapshot-testing) make this straightforward. We can perform an API call, replace a few variable values (e.g. date of request), and have a reasonable expectation that we will not be caught unawares by these changes.

#### Reporting and Logging

The duration of test runs, both severally and singly, should be recorded and reported. This gives transparency to the developer (who might be waiting for tests to pass on their PR) and also allows tracking the length of test runs over time. This can help us correlate sudden increases in test duration with code changes so that we can inspect or reverse them. It also helps us to set realistic expectations for the review and deployment processes.

On the CMS side, we're using Datadog fairly heavily; we should ensure that any GitHub action that runs a test suite reports relevant metrics to Datadog.

## Roles and Responsibilities

## Risks

## Scheduling

## Release Control
