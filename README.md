# vector-react-demo

This repo is a small UI for exploring [Vector](https://github.com/blueshift-gg/vector) on Solana.

## What Vector Does

Vector is an onchain primitive for authorizing an exact transaction with an offchain Ed25519 key.

At a high level:

- a signer creates a signature offchain
- Vector recomputes the same transaction digest onchain
- if the signature matches, Vector allows the authorized instruction flow to continue
- after a successful use, Vector advances its seed so the same authorization cannot be replayed

This demo focuses on the core localnet flow:

1. Create a session signing key in the UI.
2. Initialize a Vector account for that key.
3. Prepare a demo SPL mint whose authority is the Vector PDA.
4. Run `advance` to transfer mint authority to the connected wallet, mint tokens, and transfer authority back.
5. Close the Vector account.

## Pull And Run

```bash
git clone git@github.com:beeman/vector-react-demo.git
cd vector-react-demo
bun install
```

Start the local validator in one terminal:

```bash
bun run validator
```

Start the app in another terminal:

```bash
bun run dev
```

Then open `http://localhost:5173`.

## What `bun run validator` Does

The validator command starts `solana-test-validator` with a vendored Vector program binary, so you do not need to build the nested `tmp/vector` workspace first.

It uses:

- [fixtures/vector/vector_program.so](/Users/beeman/dev/beeman/vector-react-demo/fixtures/vector/vector_program.so)
- [fixtures/vector/rent.json](/Users/beeman/dev/beeman/vector-react-demo/fixtures/vector/rent.json)
- the local ledger path `tmp/test-ledger`

## How To Use The Demo

1. Open the app.
2. Connect a wallet.
3. Select the `Localnet` cluster.
4. If the app shows a cluster warning, use `Retry` after the validator is running.
5. If the connected wallet has no SOL, use the `Request 1 SOL` action in the global banner.
6. Open `/vector`.
7. Generate or import a session key.
8. Initialize the Vector account.
9. Prepare the demo mint and token account.
10. Run the advance flow.
11. Confirm that the destination token account received `10,000` tokens and that mint authority returns to the Vector PDA.
12. Close the Vector account when finished.

## Useful Commands

```bash
bun run build
bun run check-types
bun run ci
bun run lint
bun run preview
bun run validator
```
