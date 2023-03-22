import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../Pet";

test("displays a default thumbnail", async () => {
  const pet = render(
    <StaticRouter location="">
      <Pet name={""} animal={""} breed={""} images={[]} location={""} id={0} />
    </StaticRouter>
  );

  const petThumbnail = (await pet.findByTestId(
    "thumbnail"
  )) as HTMLImageElement;
  expect(petThumbnail.src).toContain("none.jpg");
  pet.unmount();
});

test("displays a non-default thumbnail", async () => {
  const pet = render(
    <StaticRouter location="">
      <Pet
        name={""}
        animal={""}
        breed={""}
        images={["1.jpg", "2.jpg", "3.jpg"]}
        location={""}
        id={0}
      />
    </StaticRouter>
  );

  const petThumbnail = (await pet.findByTestId(
    "thumbnail"
  )) as HTMLImageElement;
  expect(petThumbnail.src).toContain("1.jpg");
  pet.unmount();
});
