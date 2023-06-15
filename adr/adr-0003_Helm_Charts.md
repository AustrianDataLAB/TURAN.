# ADR-0003: Adoption of Helm Charts for the Deployment of the turandot project

## Status

Accepted

## Context

Our cloud software project needs a more efficient, less error-prone way to manage Kubernetes deployments than manual YAML file management.

## Decision

We decide to adopt Helm, a Kubernetes package manager, to simplify and standardize deployments.

# Consequences
Benefits of Helm charts include simplified deployment, version control, release management, and parameterization. Challenges include an initial learning curve and the effort required for migration. However, we expect the benefits to outweigh these challenges.